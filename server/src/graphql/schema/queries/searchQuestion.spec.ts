import chai from 'chai';
import sinonChai from 'sinon-chai';

import { RediSearch } from '../../../redisearch/client';
import { Session } from '../../../rejson/entities/Session';
import { Squad } from '../../../rejson/entities/Squad';
import { testClient } from '../../../test/testClient.spec';

chai.use(sinonChai);
const expect = chai.expect;
describe('Query search', () => {
  beforeEach(async () => {
    const redissearch = new RediSearch();
    await redissearch.init();
  });

  it('Searches generic, many results', async () => {
    const query = `
        query {
            search(search: "we") {
                question
              descriptionBad
              descriptionGood
            }
          }`;
    const searchQuery = await testClient.query({ query });
    expect(searchQuery.data.search).to.have.length(7);
  });

  it('Searches exact, few results', async () => {
    const query = `
        query {
            search(search: "codebase") {
                question
              descriptionBad
              descriptionGood
            }
          }`;
    const searchQuery = await testClient.query({ query });
    expect(searchQuery.data.search).to.have.length(1);
  });

  it('Can find newly added questions', async () => {
    const squad = await Squad.create({ name: 'aaa' });
    const session = await Session.create({ squad });

    const addQuestion = `
            mutation addQuestion {
              addQuestion(
                input: {
                  question: {question: "abcdefghijklmnop"}
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

    const query = `
        query {
            search(search: "abcdefghijklmnop") {
                question
              descriptionBad
              descriptionGood
            }
          }`;
    const searchQuery = await testClient.query({ query });
    expect(searchQuery.data.search).to.have.length(1);
    expect(searchQuery.data.search[0].question).to.be.equal('abcdefghijklmnop');
  });
});
