import { createTestClient } from 'apollo-server-testing';

import { server } from '../graphql';

export const testClient = createTestClient(server);
