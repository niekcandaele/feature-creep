import Redis from 'ioredis';

/**
 * Singleton that retrieves the database client
 */

let client: Redis.Redis;
export function getDb() {
  if (client) {
    return client;
  }

  client = new Redis({
    host: process.env.REDIS_HOST,
    port: (process.env.REDIS_PORT as unknown) as number,
  });
  handleKernelKillSignals();
  return client;
}

/**
 * Delete all keys of the current database.
 * Particularly usefull in a unit test enviroment.
 */
export async function clearDb() {
  if (process.env.NODE_ENV === 'production') {
    throw new Error('You tried to drop the production database, silly!');
  }
  if (client) {
    await client.flushall();
  }
}

function handleKernelKillSignals() {
  // common interrupt signals.
  const signals: NodeJS.Signals[] = ['SIGHUP', 'SIGINT', 'SIGTERM']; // maybe SIGKILL and SIGSTOP?

  for (const signal of signals) {
    process.on(signal, () => client.disconnect);
  }
}
