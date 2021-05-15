import { UserInputError } from 'apollo-server';
import { GraphQLNonNull, GraphQLString } from 'graphql';

import { IContext } from '../..';
import { Person } from '../../../rejson/entities/Person';
import { Session } from '../../../rejson/entities/Session';
import { sessionType } from '../types/session';

export const sessionQuery = {
  type: sessionType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve: async (
    parent: Record<string, never>,
    args: { id: string },
    context: IContext
  ) => {
    const session = await Session.findOne(args.id);
    if (!session) throw new UserInputError('Session not found');
    await session.isReady;

    const answers = await Promise.all(
      session.activeQuestion.answers.map(async (a) => {
        const person = await Person.findOne(a.personId);
        return { ...a, person };
      })
    );

    session.activeQuestion.answers = answers;

    return session;
  },
};
