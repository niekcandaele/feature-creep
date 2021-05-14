import { createTestClient } from 'apollo-server-testing';
import sinon from 'sinon';

import { server } from '../graphql';
import { clearDb } from '../rejson/db';

export const testClient = createTestClient(server);

afterEach(async () => {
  await clearDb();
  sinon.restore();
});
