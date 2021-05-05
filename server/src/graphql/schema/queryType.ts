import { GraphQLObjectType, GraphQLString } from 'graphql';

import { personQuery } from './queries/person';
import { squadQuery, squadsQuery } from './queries/squad';

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
    squads: squadsQuery,
    squad: squadQuery,
  }),
});
