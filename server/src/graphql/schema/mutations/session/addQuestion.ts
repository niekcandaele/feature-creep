import { UserInputError } from 'apollo-server';
import { GraphQLInputObjectType, GraphQLNonNull, GraphQLString } from 'graphql';

import { IContext } from '../../..';
import { Session } from '../../../../rejson/entities/Session';
import { questionType } from '../../types/session';

const addQuestionType = new GraphQLInputObjectType({
  name: 'addQuestion',
  fields: () => ({
    sessionId: { type: new GraphQLNonNull(GraphQLString) },
    question: { type: new GraphQLNonNull(GraphQLString) },
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
      input: { sessionId: string; question: string };
    },
    context: IContext
  ) => {
    const session = await Session.findOne(args.input.sessionId);
    if (!session) throw new UserInputError('Invalid session ID');

    return session.addQuestion(args.input.question);
  },
};
