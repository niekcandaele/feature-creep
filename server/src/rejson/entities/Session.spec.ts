import * as chai from 'chai';
import chaiAsPromised from 'chai-as-promised';

import { createPerson } from '../../test/util';
import { Session } from './Session';

chai.use(chaiAsPromised);
const { expect } = chai;

describe('Session', () => {
  it('Creates a session', async () => {
    const created = await Session.create({});
    const session = await Session.findOne(created.id);
    if (!session) throw new Error('No session');

    expect(session.date).to.be.lessThanOrEqual(Date.now());
  });
  it('Can add a question to the session', async () => {
    const created = await Session.create({});

    await created.addQuestion(
      'What is the answer to life, the universe and everything?'
    );

    const session = await Session.findOne(created.id);
    if (!session) throw new Error('No session');

    expect(session.questions).to.be.an('array');
    expect(session.questions).to.have.length(1);
    expect(session.questions[0].question).to.be.equal(
      'What is the answer to life, the universe and everything?'
    );
  });
  it('Can add an answer to a question', async () => {
    const created = await Session.create({});
    const harry = await createPerson('harry');
    await created.addQuestion(
      'What is the answer to life, the universe and everything?'
    );
    const question = created.questions[0];

    await created.answerQuestion(question.id, harry.id, '42');

    const session = await Session.findOne(created.id);
    if (!session) throw new Error('No session');

    expect(session.questions[0].answers).to.be.an('array');
    expect(session.questions[0].answers).to.have.length(1);
    expect(session.questions[0].answers[0]).to.be.eqls({
      personId: harry.id,
      answer: '42',
    });
  });
  it('Errors when the session is inactive and try to add question', async () => {
    const created = await Session.create({});
    await created.end();

    await expect(
      created.addQuestion(
        'What is the answer to life, the universe and everything?'
      )
    ).to.eventually.be.rejectedWith('Session has ended');
  });
  it('Errors when the session is inactive and try to add answer', async () => {
    const created = await Session.create({});
    const harry = await createPerson('harry');
    await created.addQuestion(
      'What is the answer to life, the universe and everything?'
    );
    await created.end();
    const question = created.questions[0];

    await expect(
      created.answerQuestion(question.id, harry.id, '42')
    ).to.eventually.be.rejectedWith('Session has ended');
  });
});
