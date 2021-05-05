import {
  GraphQLBoolean,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';

import { sessionType } from './session';

export const squadType = new GraphQLObjectType({
  name: 'Squad',
  description: 'A squad',
  fields: {
    id: {
      type: GraphQLString,
    },
    name: {
      type: GraphQLString,
    },
    members: {
      type: new GraphQLList(GraphQLString),
    },
    open: {
      type: GraphQLBoolean,
    },
    activeSession: {
      type: sessionType,
    },
  },
});
