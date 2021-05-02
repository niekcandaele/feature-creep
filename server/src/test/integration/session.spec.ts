import { expect } from 'chai';

import { Session } from '../../rejson/entities/Session';
import { Squad } from '../../rejson/entities/Squad';
import { testClient } from '../testClient.spec';
import { createPerson } from '../util';

describe('INTEGRATION session activity', () => {
  it('Does the thing', async () => {
    const harry = await createPerson('harry');
    const ron = await createPerson('ron');

    const squad = await Squad.create({ name: 'testing Squad' });

    await squad.addMember(harry);
    await squad.addMember(ron);

    // Start a new session
    const createSession = `
        mutation createSession {
            createSession(input:{squadId:"${squad.id}"}){
              id
              active
            }
          }
        `;
    const createSessionRes = await testClient.mutate({
      mutation: createSession,
    });
    const session = await Session.findOne(
      createSessionRes.data.createSession.id
    );
    if (!session) throw new Error('Session undefined');

    expect(session.active).to.be.true;

    // Add a question to the session
    const addQuestion = `
          mutation addQuestion {
            addQuestion(
              input: {
                question: "How you doin ?"
                sessionId: "${session.id}"
              }
            ) {
              id
              question
              answers {
                answer
              }
            }
          }`;
    const addQuestionRes = await testClient.mutate({ mutation: addQuestion });
    const question = addQuestionRes.data.addQuestion;

    expect(question.id).to.be.a('string');
    expect(question.question).to.be.equal('How you doin ?');
    expect(question.answers).to.be.an('array');
    expect(question.answers).to.have.length(0);

    // Answer the question
    const answerQuestion = `mutation answerQuestion {
            answerQuestion(input:{
              answer: "Just dandy!", 
              questionId:"${question.id}",
              sessionId:"${session.id}"
            }) {
                id
                answer
                person {
                  id
                }
              }
          }`;
    const answerQuestionRes = await testClient.mutate({
      mutation: answerQuestion,
    });
    const answer = answerQuestionRes.data.answerQuestion;

    expect(answer.id).to.be.a('string');
    expect(answer.person.id).to.be.a('string');
    expect(answer.answer).to.be.equal('Just dandy!');

    // End the session
    const endSession = `mutation endSession {
            endSession(input:{
              sessionId:"${session.id}"
            }) {
              id
              active
            }
          }`;

    const endSessionRes = await testClient.mutate({ mutation: endSession });
    const endedSession = endSessionRes.data.endSession;

    expect(endedSession.id).to.be.equal(session.id);
    expect(endedSession.active).to.be.false;

    // Try to add an answer -> fails because session ended
    const answerQuestionAfterSessionEnded = `mutation answerQuestion {
            answerQuestion(input:{
              answer: "Lemme sneak in another answer!", 
              questionId:"${question.id}",
              sessionId:"${endedSession.id}"
            }) {
                id
                answer
                person {
                  id
                }
              }
          }`;
    const answerQuestionAfterSessionEndedRes = await testClient.mutate({
      mutation: answerQuestionAfterSessionEnded,
    });
    const answerQuestionErrors = answerQuestionAfterSessionEndedRes.errors;

    expect(answerQuestionErrors).to.be.an('array');
    expect(answerQuestionErrors).to.have.length(1);
    expect(answerQuestionErrors![0].message).to.be.equal('Session has ended');

    // Try to add a question -> fails because session ended
    const addQuestionAfterSessionEnded = `
        mutation addQuestion {
          addQuestion(
            input: {
              question: "How you doin' ?"
              sessionId: "${session.id}"
            }
          ) {
            id
            question
            answers {
              answer
            }
          }
        }`;
    const addQuestionAfterSessionEndedRes = await testClient.mutate({
      mutation: addQuestionAfterSessionEnded,
    });
    const questionErrors = addQuestionAfterSessionEndedRes.errors;

    expect(questionErrors).to.be.an('array');
    expect(questionErrors).to.have.length(1);
    expect(questionErrors![0].message).to.be.equal('Session has ended');
  });
});
