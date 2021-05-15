import { config } from 'dotenv';

import { GearsClient } from './gears/gears';
import { server } from './graphql';
import { getRediSearch } from './redisearch/client';
import { setUpTestData } from './test/util';
import { Timeseries } from './timeseries/client';

config();

export const gears = new GearsClient();
export const timeseries = new Timeseries();

async function main() {
  const search = await getRediSearch();

  await gears.initialize();
  await timeseries.initialize();

  server.listen().then((data: any) => {
    console.log(`🚀  Server ready at ${data.url}`);
  });

  if (process.env.NODE_ENV !== 'production') {
    await setUpTestData();
  }
}

main().catch((e) => console.error(e));
