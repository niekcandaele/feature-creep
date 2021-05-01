import { UserInputError } from 'apollo-server';
import { v4 as uuid } from 'uuid';

import { BaseEntity } from './BaseEntity';
import { Person } from './Person';
import { Squad } from './Squad';

interface SessionOpts {
  active: boolean;
  questions: IQuestion[];
  squad: Squad;
  date: Date;
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
  public date: Date;
  public questions: IQuestion[] = [];
  public active: boolean;
  public squad: Squad;

  constructor(opts: SessionOpts) {
    super();

    if (!opts.squad) {
      throw new UserInputError(
        'Must provide a squad when creating a new session'
      );
    }
    this.date = opts.date || new Date();
    this.active = opts.active === undefined ? true : opts.active;
    this.questions = opts.questions || [];
    this.squad = opts.squad;
  }

  async addQuestion(question: string) {
    console.log(`Session: Adding a question to session ${this.id}`);
    if (!this.active) throw new UserInputError('Session has ended');
    const questionData = { answers: [], question, id: uuid() };
    this.questions.push(questionData);
    await this.save();
    return questionData;
  }

  async answerQuestion(questionId: string, personId: string, answer: string) {
    console.log(
      `Session: Person ${personId} is answering question ${questionId}`
    );

    if (!this.active) throw new UserInputError('Session has ended');
    const question = this.questions.find((q) => q.id === questionId);
    if (!question) throw new UserInputError('Invalid question ID');
    const answerData = { answer, personId, id: uuid() };
    question.answers.push(answerData);
    await this.save();

    const person = await Person.findOne(personId);
    return { ...answerData, person };
  }

  async end() {
    console.log(`Session: Ending session ${this.id}`);

    this.active = false;
    return this.save();
  }
}
