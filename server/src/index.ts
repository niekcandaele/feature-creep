import { config } from 'dotenv';

import { GearsClient } from './gears/gears';
import { server } from './graphql';
import { getRediSearch } from './redisearch/client';

config();

async function main() {
  const search = await getRediSearch();
  const gears = new GearsClient();
  await gears.initialize();

  server.listen().then((data: any) => {
    console.log(`🚀  Server ready at ${data.url}`);
  });
}

main();
