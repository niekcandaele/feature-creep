import * as chai from 'chai';
import chaiAsPromised from 'chai-as-promised';

import { createPerson } from '../../test/util';
import { Session } from './Session';
import { Squad } from './Squad';

chai.use(chaiAsPromised);
const { expect } = chai;

describe('Session', () => {
  it('Creates a session', async () => {
    const squad = await Squad.create({ name: 'Gryffindor' });
    const created = await Session.create({ squad });
    const session = await Session.findOne(created.id);
    if (!session) throw new Error('No session');

    expect(session.date).to.be.lessThanOrEqual(new Date());
  });

  it('Loads default questions into sessions', async () => {
    const squad = await Squad.create({ name: 'Gryffindor' });
    const created = await Session.create({ squad });
    const session = await Session.findOne(created.id);
    if (!session) throw new Error('No session');

    expect(session.date).to.be.lessThanOrEqual(new Date());
    expect(session.questions).to.have.length(8);
    for (const q of session.questions) {
      expect(q.descriptionBad).to.be.ok;
      expect(q.descriptionGood).to.be.ok;
    }
  });
  it('Can add a question to the session', async () => {
    const squad = await Squad.create({ name: 'Gryffindor' });
    const created = await Session.create({ squad });

    const createdQuestion = await created.addQuestion(
      'What is the answer to life, the universe and everything?'
    );

    const session = await Session.findOne(created.id);
    if (!session) throw new Error('No session');

    expect(session.questions).to.be.an('array');
    // 8 default questions + 1 added
    expect(session.questions).to.have.length(9);
    const question = session.questions.find((q) => q.id === createdQuestion.id);
    if (!question) throw new Error('question undefined');
    expect(question.question).to.be.equal(
      'What is the answer to life, the universe and everything?'
    );
  });
  it('Can add an answer to a question', async () => {
    const squad = await Squad.create({ name: 'Gryffindor' });
    const created = await Session.create({ squad });
    const harry = await createPerson('harry');
    const createdQuestion = await created.addQuestion(
      'What is the answer to life, the universe and everything?'
    );
    const question = createdQuestion;

    await created.answerQuestion(question.id, harry.id, '42');

    const session = await Session.findOne(created.id);
    if (!session) throw new Error('No session');

    const questionAfter = session.questions.find(
      (q) => q.id === createdQuestion.id
    );
    if (!questionAfter) throw new Error('question undefined');

    expect(questionAfter.answers).to.be.an('array');
    expect(questionAfter.answers).to.have.length(1);

    expect(questionAfter.answers[0].personId).to.be.equal(harry.id);
    expect(questionAfter.answers[0].answer).to.be.equal('42');
  });
  it('Errors when the session is inactive and try to add question', async () => {
    const squad = await Squad.create({ name: 'Gryffindor' });
    const created = await Session.create({ squad });
    await created.end();

    await expect(
      created.addQuestion(
        'What is the answer to life, the universe and everything?'
      )
    ).to.eventually.be.rejectedWith('Session has ended');
  });
  it('Errors when the session is inactive and try to add answer', async () => {
    const squad = await Squad.create({ name: 'Gryffindor' });
    const created = await Session.create({ squad });
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
