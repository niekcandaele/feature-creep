import Redis from 'ioredis';

let client: Redis.Redis;


export function getDb() {
  if (client) {
    return client;
  }
  client = new Redis({
    host: 'localhost', // TODO: put this in env
    port: 6379,
  });
  return client;
}

export async function clearDb() {
  if (process.env.NODE_ENV === 'production') {
    throw new Error('You tried to drop the production database, silly');
  }
  if (client) {
    await client.flushall();
  }
}


// TODO: Catch more events maybe?
process.on('SIGINT', async () => {
  client.disconnect()
})