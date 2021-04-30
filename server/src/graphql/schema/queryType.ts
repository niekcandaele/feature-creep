import { GraphQLObjectType, GraphQLString } from 'graphql';

import { personQuery } from './queries/person';
import { squadQuery } from './queries/squad';

export const queryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    ping: {
      type: GraphQLString,
      resolve() {
        return 'PONG!';
      },
    },
    person: personQuery,
    squads: squadQuery,
  }),
});
