import { expect } from 'chai';

import { Squad } from '../../../rejson/entities/Squad';
import { testClient } from '../../../test/testClient.spec';

describe('Squad query', () => {
  it('Can get by ID', async () => {
    const squad = await Squad.create({ name: 'Heyy' });
    const query = `
        query {
            squad(id: "${squad.id}") {
              name
            }
          }`;
    const res = await testClient.query({ query });
    expect(res.data.squad.name).to.be.equal('Heyy');
  });
});
