import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

import { getDb } from '../../../../rejson/db';
import { Session } from '../../../../rejson/entities/Session';
import { Squad } from '../../../../rejson/entities/Squad';
import { testClient } from '../../../../test/testClient.spec';

chai.use(sinonChai);
const expect = chai.expect;
describe('MUTATION addQuestion', () => {
  it('Adds the question to the search index', async () => {
    const db = await getDb();
    const spy = sinon.spy(db, 'hset');
    const squad = await Squad.create({ name: 'aaa' });
    const session = await Session.create({ squad });

    const addQuestion = `
        mutation addQuestion {
          addQuestion(
            input: {
              question: {question: "How you doin"}
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
    const lastCall = spy.lastCall;
    expect(lastCall.args[2]).to.be.equal('How you doin');
  });
});
