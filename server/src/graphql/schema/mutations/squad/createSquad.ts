import { GraphQLInputObjectType, GraphQLNonNull, GraphQLString } from 'graphql';

import { IContext } from '../../..';
import { Squad } from '../../../../rejson/entities/Squad';
import { squadType } from '../../types/squad';

export const createSquad = {
  type: squadType,
  args: {
    input: {
      type: new GraphQLInputObjectType({
        name: 'CreateSquad',
        fields: {
          name: {
            type: new GraphQLNonNull(GraphQLString),
          },
        },
      }),
    },
  },
  resolve: async (
    parent: Record<string, never>,
    args: {
      input: { name: string };
    },
    context: IContext
  ) => {
    const squad = await Squad.create({
      name: args.input.name,
    });
    squad.open = true;
    await squad.addMember(context.user);
    squad.open = false;
    return squad;
  },
};
