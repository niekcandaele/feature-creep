import { GraphQLSchema } from 'graphql';

import { mutationType } from './mutationType';
import { queryType } from './queryType';

export const schema = new GraphQLSchema({
  query: queryType,
  mutation: mutationType,
});
