import { expect } from 'chai';

import { testClient } from '../../../test/testClient.spec';
import { setUpTestData, wait } from '../../../test/util';

describe('QUERY session', () => {
  it('Returns a bunch of data', async function () {
    this.timeout(10000);
    const { sessions } = await setUpTestData();
    console.log('created test data');

    for (const session of sessions) {
      await session.end();
      // Make sure the BG process has ran before we query
      await wait();
      const query = `
            query {
                session(id:"${session.id}") {
                    questions {
                      total
                      answers {
                        answer
                      }
                    }
                  }
            }`;

      const response = await testClient.query({ query });
      expect(response.data.session.questions).to.be.an('array');
      for (const question of response.data.session.questions) {
        expect(question.total).to.not.be.undefined;
        expect(question.answers).to.be.an('array');
      }
    }
  });
});
