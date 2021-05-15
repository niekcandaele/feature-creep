import hasha from 'hasha';
import IORedis from 'ioredis';

import { getDb } from '../rejson/db';
import { Session } from '../rejson/entities/Session';

export class Timeseries {
  client: IORedis.Redis | null = null;

  private listener = setInterval(() => this.listenForMessage(), 1000);
  private streamName = 'Squad-report-ts';
  private groupName = 'feature-creep-ts';
  private tsPrefix = 'question:';

  async initialize() {
    this.client = await getDb();
    await this.createGroup();
  }

  private getTsName(squadId: string, question: string) {
    return `squad:${squadId}:question${hasha(question)}`;
  }

  private async createTimeseries(squadId: string, question: string) {
    try {
      await this.client?.send_command(
        'TS.CREATE',
        this.getTsName(squadId, question)
      );
    } catch (error) {
      if (error.message !== 'ERR TSDB: key already exists') throw error;
    }
  }

  public async add(squadId: string, question: string, value: number) {
    const tsName = this.getTsName(squadId, question);
    await this.createTimeseries(squadId, question);
    await this.client?.send_command('TS.ADD', tsName, '*', value);
    console.log(
      `[TIMESERIES] Added to ${squadId} ${question} value = ${value}`
    );
  }

  private async processMessage(id: string, message: string[]) {
    const sessionId = JSON.parse(message[1]).id;
    const session = await Session.findOne(sessionId);
    if (!session) return this.acknowledge(id);

    for (const question of session.questions) {
      const avg = await this.client?.get(`Question:${question.id}:average`);

      if (!avg) continue;
      await this.add(session.squad.id, question.question, parseFloat(avg));
    }

    await this.acknowledge(id);
  }

  private async acknowledge(id: string) {
    await this.client?.xack(this.streamName, this.groupName, id);
  }

  private async createGroup() {
    try {
      const res = await this.client?.xgroup(
        'CREATE',
        this.streamName,
        this.groupName,
        '$',
        'MKSTREAM'
      );
    } catch (error) {
      if (error.message !== 'BUSYGROUP Consumer Group name already exists')
        throw error;
    }
  }

  async listenForMessage() {
    console.log('Checking for new stream data');
    const results = await this.client?.xreadgroup(
      'GROUP',
      this.groupName,
      'main',
      'STREAMS',
      this.streamName,
      '>'
    );
    if (!results) return;
    const [key, message] = results[0];

    for (const result of results) {
      const [stream, events] = result;
      for (const event of events) {
        try {
          await this.processMessage(
            event[0],
            (event[1] as unknown) as string[]
          );
        } catch (error) {
          console.error(error);
        }
      }
    }
  }
}
