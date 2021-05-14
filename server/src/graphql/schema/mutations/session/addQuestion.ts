import { UserInputError } from 'apollo-server';
import { GraphQLInputObjectType, GraphQLNonNull, GraphQLString } from 'graphql';

import { IContext } from '../../..';
import { IQuestion, RediSearch } from '../../../../redisearch/client';
import { Session } from '../../../../rejson/entities/Session';
import { questionType } from '../../types/session';

const search = new RediSearch();

const addQuestionType = new GraphQLInputObjectType({
  name: 'addQuestion',
  fields: () => ({
    sessionId: { type: new GraphQLNonNull(GraphQLString) },
    question: {
      type: new GraphQLInputObjectType({
        name: 'question',
        fields: () => ({
          question: { type: new GraphQLNonNull(GraphQLString) },
          descriptionGood: { type: GraphQLString },
          descriptionBad: { type: GraphQLString },
        }),
      }),
    },
  }),
});

export const addQuestion = {
  type: questionType,
  args: {
    input: { type: addQuestionType },
  },
  resolve: async (
    parent: Record<string, never>,
    args: {
      input: { sessionId: string; question: IQuestion };
    },
    context: IContext
  ) => {
    const session = await Session.findOne(args.input.sessionId);
    if (!session) throw new UserInputError('Invalid session ID');

    await search.init();
    await search.addQuestion(args.input.question);

    return session.addQuestion(args.input.question);
  },
};
