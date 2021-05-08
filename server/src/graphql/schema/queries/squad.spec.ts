import { expect } from 'chai';

import { Squad } from '../../../rejson/entities/Squad';
import { testClient } from '../../../test/testClient.spec';
import { setUpTestData } from '../../../test/util';

describe('Squad query', () => {
  it('Can get by ID', async () => {
    await setUpTestData();
    const squad = (await Squad.findAll())[0];
    const query = `
        query {
            squad(id: "${squad.id}") {
              name
              sessions {
                id
              }
            }
          }`;
    const res = await testClient.query({ query });
    expect(res.data.squad.name).to.be.equal('testers');

    expect(res.data.squad.sessions.length).to.be.greaterThan(0);
  });
});
