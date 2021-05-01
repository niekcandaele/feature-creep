import { createTestClient } from 'apollo-server-testing';

import { server } from '../graphql';
import { clearDb } from '../rejson/db';

export const testClient = createTestClient(server);

afterEach(async () => {
    await clearDb();
});
