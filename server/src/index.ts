import { config } from 'dotenv';

import { server } from './graphql';
import { getRediSearch } from './redisearch/client';

config();

async function main() {
  const search = await getRediSearch();

  server.listen().then((data: any) => {
    console.log(`🚀  Server ready at ${data.url}`);
  });
}

main();
