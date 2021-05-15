import { expect } from 'chai';
import sinon from 'sinon';

import { GearsClient } from '../gears/gears';
import { getDb } from '../rejson/db';
import { testClient } from '../test/testClient.spec';
import { setUpTestData, wait } from '../test/util';
import { Timeseries } from './client';

describe('timeseries', () => {
  it('processes stream, saves to timeseries and is queryable via gql', async function () {
    this.timeout(60000);
    const db = await getDb();
    const gears = new GearsClient();
    await gears.initialize();
    const client = new Timeseries();
    const stub = sinon.spy(db, 'xack');
    await client.initialize();

    const { sessions, squad } = await setUpTestData();

    for (const session of sessions) {
      await session.end();
    }
    await wait(5);

    expect(stub).to.have.been.called;

    const question = sessions[0].questions[0];

    const query = `query test {
            timeseries(squadId:"${squad.id}", questionName:"${question.question}") {
              timestamp
              value
            }
          }`;
    const res = await testClient.query({ query });
    console.log(JSON.stringify(res, null, 4));

    expect(res.data.timeseries).to.be.an('array');
    expect(res.data.timeseries.length).to.be.greaterThan(10);
  });
});
