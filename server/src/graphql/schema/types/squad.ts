import {
  GraphQLBoolean,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';

import { personType } from './person';
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
      type: new GraphQLList(personType),
    },
    open: {
      type: GraphQLBoolean,
    },
    activeSession: {
      type: sessionType,
    },
    sessions: {
      type: new GraphQLList(sessionType),
    },
  },
});
