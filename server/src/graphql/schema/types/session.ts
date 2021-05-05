import {
  GraphQLBoolean,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';

import { personType } from './person';

export const answerType = new GraphQLObjectType({
  name: 'Answer',
  fields: {
    id: {
      type: GraphQLString,
    },
    answer: {
      type: GraphQLString,
    },
    person: {
      type: personType,
    },
  },
});

export const questionType = new GraphQLObjectType({
  name: 'Question',
  fields: {
    id: {
      type: GraphQLString,
    },
    question: {
      type: GraphQLString,
    },
    answers: {
      type: GraphQLList(answerType),
    },
  },
});

export const sessionType = new GraphQLObjectType({
  name: 'Session',
  description: 'A sesion',
  fields: {
    id: {
      type: GraphQLString,
    },
    name: {
      type: GraphQLString,
    },
    active: {
      type: GraphQLBoolean,
    },
    questions: {
      type: new GraphQLList(questionType),
    },
  },
});
