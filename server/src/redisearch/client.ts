import { exists } from 'fs';
import IORedis from 'ioredis';
import { v4 as uuid } from 'uuid';

import { getDb } from '../rejson/db';
import { wait } from '../test/util';

export interface IQuestion {
  question: string;
  descriptionGood?: string;
  descriptionBad?: string;
}

export class RediSearch {
  db: IORedis.Redis | undefined;
  private isReady = false;
  private indexName = 'questions-idx';
  async addQuestion(question: IQuestion) {
    if (!this.db) throw new Error('DB not initialized yet...');

    const indexExists = await this.indexExists();
    if (indexExists) {
      // Try and find a question that already exists
      const res = await this.search(question.question, {
        fuzzy: false,
        onlyTitle: true,
      });

      if (res.length) {
        // If found, return that
        console.log('[REDISEARCH] Question already exists, returning this!');
        return res;
      }
    }

    console.log(`[REDISEARCH] Adding a new question to index`);

    // Otherwise create + recreate index
    this.db.hset(
      `questions:${uuid()}`,
      'question',
      question.question,
      'descriptionGood',
      question.descriptionGood || '',
      'descriptionBad',
      question.descriptionBad || ''
    );
    await this.createIndex(indexExists);
  }

  private async dropIndex() {
    if (!this.db) throw new Error('DB not initialized yet...');
    return this.db.send_command('FT.DROPINDEX', this.indexName);
  }

  private async createIndex(recreate = false) {
    if (!this.db) throw new Error('DB not initialized yet...');
    const exists = await this.indexExists();

    if (exists && !recreate) {
      console.log(
        '[REDISEARCH] Index already exists, use the recreate parameter to force a recreation'
      );
      return;
    }

    if (recreate && exists) {
      await this.dropIndex();
    }

    await this.db.send_command(
      'FT.CREATE',
      this.indexName,
      'PREFIX',
      '1',
      'questions:',
      'SCHEMA',
      'question',
      'TEXT',
      'descriptionGood',
      'TEXT',
      'descriptionBad',
      'TEXT'
    );

    let isIndexing = true;

    // Block execution while index is being scanned 🤮
    // TODO: This can be made a lot smarter by creating indices in the BG
    // And letting operations against it queue up and only executing them when the index is ready?
    // Maybe Redis gears?
    while (isIndexing) {
      const stats = await this.getIndexStats();
      isIndexing = stats.indexing;
      await wait(0.01);
    }
  }

  async search(question: string, { fuzzy = true, onlyTitle = true }) {
    if (!this.db) throw new Error('DB not initialized yet...');
    let query = question
      // Split multi-word searches into separate terms
      .split(' ')
      // Fuzzy search all the things
      .map((_) => (fuzzy ? `%${_}%` : _))
      // Apply OR operator for each search term
      .join('|');

    if (onlyTitle) query = '@question:' + query;

    const result = await this.db.send_command(
      'FT.SEARCH',
      this.indexName,
      query
    );

    const parsed: IQuestion[] = result
      // Filter out noise from keys or total
      .filter((_: unknown) => Array.isArray(_))
      .map(
        (_: string[]): IQuestion => {
          const questionIdx = _.findIndex((_) => _ === 'question');
          const descriptionBadIdx = _.findIndex((_) => _ === 'descriptionBad');
          const descriptionGoodIdx = _.findIndex(
            (_) => _ === 'descriptionGood'
          );

          return {
            question: _[questionIdx + 1],
            descriptionBad: _[descriptionBadIdx + 1],
            descriptionGood: _[descriptionGoodIdx + 1],
          };
        }
      );

    return parsed;
  }

  public async init() {
    if (this.isReady) return;
    this.db = await getDb();
    await this.setDefaults();
    // Recreate the index
    await this.createIndex(true);
    this.isReady = true;
    console.log(`[RediSearch] initialized`);
  }

  public async getIndexStats() {
    if (!this.db) throw new Error('DB not initialized yet...');
    const res: string[] = await this.db.send_command('FT.INFO', this.indexName);

    const indexingIdx = res.findIndex((_) => _ === 'indexing');
    const totalDocsIdx = res.findIndex((_) => _ === 'num_docs');
    return {
      totalDocs: parseInt(res[totalDocsIdx + 1], 10),
      indexing: res[indexingIdx + 1] === '1',
    };
  }

  private async indexExists(): Promise<boolean> {
    if (!this.db) throw new Error('DB not initialized yet...');

    try {
      const r = await this.db.send_command('FT.INFO', this.indexName);
      return true;
    } catch (error) {
      // This message means the index does not exist
      if (error.message === 'Unknown Index name') return false;
      // If we get some other error, throw it
      throw error;
    }
  }

  private async setDefaults() {
    if (!this.db) throw new Error('DB not initialized yet...');
    for (const q of defaultQuestions) {
      await this.addQuestion(q);
    }
  }
}

// Questions based on https://engineering.atspotify.com/2014/09/16/squad-health-check-model/
export const defaultQuestions = [
  {
    descriptionGood:
      "We deliver great stuff ! Were proud of  it and our stakeholders are really happy",
    descriptionBad:
      'We deliver crap. We feel ashamed to deliver it. Our stakeholders hate us.',
    question: 'Delivering value',
  },
  {
    descriptionGood:
      'Releasing is simple, safe, painless and mostly automated. ',
    descriptionBad:
      'Releasing is risky, painful, lots of  manual work and takes forever.',
    question: 'Easy to release',
  },
  {
    descriptionGood:
      'We love going to work and have great fun working together! ',
    descriptionBad: 'Boooooooring...',
    question: 'Fun',
  },
  {
    descriptionGood:
      "Were proud of  the quality of  our code! It is clean, easy to read and has great test coverage. ",
    descriptionBad:
      'Our code is a pile of  dung and technical debt is raging out of  control. ',
    question: 'Health of codebase',
  },
  /*   {
      descriptionGood: "Were learning lots of  interesting stuff  all the time!",
      descriptionBad: 'We never have time to learn anything.',
      question: 'Learning',
    },
    {
      descriptionGood:
        'We know exactly why we are here and were really excited about it! ',
      descriptionBad:
        "We have no idea why we are here, theres no high lever picture or focus. Our so called mission is completely unclear and uninspiring. ",
      question: 'Mission',
    },
    {
      descriptionGood:
        'We are in control of  our own destiny! We decide what to build and how to build it. ',
      descriptionBad:
        'We are just pawns in a game of  chess with no influence over what we build or how we build it. ',
      question: 'Pawns or players',
    },
    {
      descriptionGood:
        'We get stuff  done really quickly! No waiting and no delays. ',
      descriptionBad:
        'We never seem to get anything done. We keep getting stuck or interrupted. Stories keep getting stuck on dependencies. ',
      question: 'Speed',
    }, */
];

let instance: RediSearch;

export async function getRediSearch() {
  if (instance) return instance;

  instance = new RediSearch();
  await instance.init();

  return instance;
}
