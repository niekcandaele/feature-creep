import { config } from 'dotenv';

import { server } from './graphql';

config();

server.listen().then((data: any) => {
  console.log(`🚀  Server ready at ${data.url}`);
});
