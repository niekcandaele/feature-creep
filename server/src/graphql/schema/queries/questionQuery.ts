import { UserInputError } from 'apollo-server';
import { GraphQLNonNull, GraphQLString } from 'graphql';

import { IContext } from '../..';
import { Person } from '../../../rejson/entities/Person';
import { Session } from '../../../rejson/entities/Session';
import { questionType } from '../types/session';

export const questionQuery = {
  type: questionType,
  args: {
    questionId: { type: new GraphQLNonNull(GraphQLString) },
    sessionId: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve: async (
    parent: Record<string, never>,
    args: { questionId: string, sessionId: string },
    context: IContext
  ) => {
    const session = await Session.findOne(args.sessionId);
    if (!session) throw new UserInputError('Invalid session ID');

    const question = session.questions.find(q => q.id === args.questionId);

    if (!question) throw new UserInputError('Invalid question ID');

    question.answers = await Promise.all(question.answers.map(async a => {
      const person = await Person.findOne(a.personId);
      return { ...a, person };
    }));

    return question;
  },
};
