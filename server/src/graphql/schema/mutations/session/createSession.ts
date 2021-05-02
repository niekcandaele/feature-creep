import { UserInputError } from 'apollo-server';
import { GraphQLInputObjectType, GraphQLNonNull, GraphQLString } from 'graphql';

import { IContext } from '../../..';
import { Session } from '../../../../rejson/entities/Session';
import { Squad } from '../../../../rejson/entities/Squad';
import { sessionType } from '../../types/session';

const createSessionInput = new GraphQLInputObjectType({
  name: 'createSessionInput',
  fields: () => ({
    squadId: { type: new GraphQLNonNull(GraphQLString) },
  }),
});

export const createSession = {
  type: sessionType,
  args: {
    input: {
      type: new GraphQLNonNull(createSessionInput),
    },
  },
  resolve: async (
    parent: Record<string, never>,
    args: {
      input: { squadId: string };
    },
    context: IContext
  ) => {
    const squad = await Squad.findOne(args.input.squadId);
    if (!squad) throw new UserInputError('Invalid squad ID');
    return Session.create({ squad });
  },
};
