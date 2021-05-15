import { UserInputError } from 'apollo-server';
import { v4 as uuid } from 'uuid';

import {
  defaultQuestions,
  IQuestion as ISearchQuestion,
} from '../../redisearch/client';
import { getDb } from '../db';
import { BaseEntity } from './BaseEntity';
import { Person } from './Person';
import { Squad } from './Squad';

interface SessionOpts {
  id: string;
  active: boolean;
  questions: IQuestion[];
  squad: Squad;
  date: Date;
  activeQuestion: IQuestion;
}

interface IQuestion {
  id: string;
  question: string;
  descriptionGood?: string;
  descriptionBad?: string;
  answers: IAnswer[];
  total?: number;
}

interface IAnswer {
  personId: string;
  answer: number;
}

export class Session extends BaseEntity {
  //------------------------
  // Properties
  //------------------------
  public date: Date;
  public questions: IQuestion[] = [];
  public active: boolean;
  public squad: Squad;
  public activeQuestion: IQuestion;

  constructor(opts: SessionOpts) {
    super(opts);

    if (!opts.squad) {
      throw new UserInputError(
        'Must provide a squad when creating a new session'
      );
    }
    this.date = new Date(opts.date) || new Date();
    this.active = opts.active === undefined ? true : opts.active;
    this.questions = opts.questions || [];
    this.squad = opts.squad;
    this.activeQuestion = opts.activeQuestion || this.questions[0];

    // We reset this because it relies on data set after the super() call
    this.isReady = new Promise((resolve, reject) => {
      this.initialize().then(resolve).catch(reject);
    });
  }

  async afterCreate() {
    for (const question of defaultQuestions) {
      this.addQuestion(question);
    }
    this.activeQuestion = this.questions[0];
    return this;
  }

  async setActiveQuestion(q: IQuestion) {
    this.activeQuestion = q;
    return this.save();
  }

  async addQuestion({
    descriptionBad,
    descriptionGood,
    question,
  }: ISearchQuestion) {
    console.log(`Session: Adding a question to session ${this.id}`);
    if (!this.active) throw new UserInputError('Session has ended');
    const questionData: IQuestion = {
      answers: [],
      question,
      id: uuid(),
      descriptionBad,
      descriptionGood,
    };
    this.questions.push(questionData);
    await this.save();
    return questionData;
  }

  async answerQuestion(questionId: string, personId: string, answer: number) {
    console.log(
      `Session: Person ${personId} is answering question ${questionId}`
    );

    if (0 > answer || answer > 2)
      throw new UserInputError('Answer must be a number 0-2');

    if (!this.active) throw new UserInputError('Session has ended');
    const question = this.questions.find((q) => q.id === questionId);
    if (!question) throw new UserInputError('Invalid question ID');
    const answerData = { answer, personId, id: uuid() };
    question.answers.push(answerData);
    this.activeQuestion.answers.push(answerData);
    await this.save();

    const person = await Person.findOne(personId);
    return { ...answerData, person };
  }

  async end() {
    if (!this.active) return;
    console.log(`Session: Ending session ${this.id}`);

    this.active = false;
    await this.save();
    // Push an event into a stream
    // This will trigger a Redis Gears function to do bg processing
    await getDb().send_command('XADD', 'Session-end', '*', 'id', this.id);
    return this;
  }

  public async getTotals() {
    const returnVal: Record<string, number> = {};
    for (const question of this.questions) {
      const total = await getDb().get(`Question:${question.id}:total`);
      // not !total because it could be 0!
      if (total === null) continue;
      returnVal[question.id] = parseInt(total, 10);
    }

    return returnVal;
  }

  async init() {
    if (!this.questions) {
      return;
    }

    if (this.active) {
      // No need to get the totals if a session hasnt ended yet
      return;
    }

    const totals = await this.getTotals();

    this.questions = this.questions.map((q) => {
      return {
        ...q,
        total: totals[q.id],
      };
    });
  }
}
