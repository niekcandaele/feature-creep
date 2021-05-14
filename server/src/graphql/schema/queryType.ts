import { GraphQLObjectType, GraphQLString } from 'graphql';

import { personQuery } from './queries/person';
import { searchQuery } from './queries/searchQuestion';
import { sessionQuery } from './queries/session';
import { squadQuery, squadsQuery } from './queries/squad';

export const queryType = new GraphQLObjectType({
  name: 'Query',
  // @ts-expect-error
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
    session: sessionQuery,
    search: searchQuery,
  }),
});
