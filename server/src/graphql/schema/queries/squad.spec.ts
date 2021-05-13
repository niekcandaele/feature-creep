import { expect } from 'chai';

import { Session } from '../../../rejson/entities/Session';
import { Squad } from '../../../rejson/entities/Squad';
import { testClient } from '../../../test/testClient.spec';

describe('Squad query', () => {
  it('Can get by ID', async () => {
    const squad = await Squad.create({ name: 'testers' });

    await Session.create({ squad });
    await Session.create({ squad });
    await Session.create({ squad });

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

    expect(res.data.squad.sessions.length).to.be.equal(3);
  });
});
