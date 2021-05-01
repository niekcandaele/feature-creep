import { UserInputError } from 'apollo-server';
import { v4 as uuid } from 'uuid';

import { JsonCommands } from '../commands';
import { getDb } from '../db';
import { BaseEntity } from './BaseEntity';

interface SessionOpts {
  active: boolean;
  questions: IQuestion[];
}

interface IQuestion {
  id: string;
  question: string;
  answers: IAnswer[];
}

interface IAnswer {
  personId: string;
  answer: string;
}

export class Session extends BaseEntity {
  //------------------------
  // Properties
  //------------------------
  public date: number;
  public questions: IQuestion[] = [];
  public active: boolean;

  constructor(opts: SessionOpts) {
    super();
    this.date = Date.now();
    this.active = opts.active || true;
    this.questions = opts.questions || [];
  }

  async save() {
    await getDb().send_command(
      JsonCommands.Set,
      `Session:${this.id}`,
      '.',
      JSON.stringify(this)
    );
    return this;
  }

  async addQuestion(question: string) {
    if (!this.active) throw new UserInputError('Session has ended');
    this.questions.push({ answers: [], question, id: uuid() });
    return this.save();
  }

  async answerQuestion(questionId: string, personId: string, answer: string) {
    if (!this.active) throw new UserInputError('Session has ended');
    const question = this.questions.find((q) => q.id === questionId);
    if (!question) throw new UserInputError('Invalid question ID');

    question.answers.push({ answer, personId });
    return this.save();
  }

  async end() {
    this.active = false;
    return this.save();
  }
}
