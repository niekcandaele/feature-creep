import { UserInputError } from 'apollo-server';
import { GraphQLInputObjectType, GraphQLNonNull, GraphQLString } from 'graphql';

import { IContext } from '../../..';
import { Session } from '../../../../rejson/entities/Session';
import { sessionType } from '../../types/session';

const endSessionInput = new GraphQLInputObjectType({
  name: 'endSession',
  description:
    'Ends a session. After this, no new questions or answers can be added',
  fields: () => ({
    sessionId: { type: new GraphQLNonNull(GraphQLString) },
  }),
});

export const endSession = {
  type: sessionType,
  args: {
    input: { type: endSessionInput },
  },
  resolve: async (
    parent: Record<string, never>,
    args: {
      input: { sessionId: string };
    },
    context: IContext
  ) => {
    const session = await Session.findOne(args.input.sessionId);
    if (!session) throw new UserInputError('Invalid session ID');

    return session.end();
  },
};
