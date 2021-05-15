import { expect } from 'chai';
import sinon from 'sinon';

import { GearsClient } from '../gears/gears';
import { setUpTestData, wait } from '../test/util';
import { Timeseries } from './client';

describe('timeseries', () => {
  it('triggers', async function () {
    this.timeout(10000000);
    const gears = new GearsClient();
    await gears.initialize();
    const client = new Timeseries();
    //@ts-expect-error private
    const stub = sinon.stub(client, 'acknowledge');
    await client.initialize();

    const { sessions } = await setUpTestData();

    for (const session of sessions) {
      await session.end();
      await wait(0.5);
    }

    expect(stub).to.have.been.called;
  });
});
