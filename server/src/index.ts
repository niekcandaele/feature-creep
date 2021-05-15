import { config } from 'dotenv';

import { GearsClient } from './gears/gears';
import { server } from './graphql';
import { getRediSearch } from './redisearch/client';
import { getDb } from './rejson/db';
import { setUpTestData } from './test/util';
import { Timeseries } from './timeseries/client';

config();

export const gears = new GearsClient();
export const timeseries = new Timeseries();

async function main() {
  const search = await getRediSearch();

  await gears.initialize();
  await timeseries.initialize();

  if (process.env.NODE_ENV !== 'production') {
    const db = await getDb();

    const hasRan = await db.get('test-data-flag');

    if (hasRan) {
      console.log(
        'Test data already exists, delete "test-data-flag" to rerun function'
      );
      return;
    }
    await setUpTestData(50, true);
    await db.set('test-data-flag', 'true');
  }

  server.listen().then((data: any) => {
    console.log(`🚀  Server ready at ${data.url}`);
  });
}

main().catch((e) => console.error(e));
