import { UserInputError } from 'apollo-server';
import { GraphQLNonNull, GraphQLString } from 'graphql';

import { IContext } from '../..';
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
    return session;
  },
};
