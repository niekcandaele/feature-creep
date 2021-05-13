import { UserInputError } from 'apollo-server';
import { GraphQLInputObjectType, GraphQLNonNull, GraphQLString } from 'graphql';

import { IContext } from '../../..';
import { Squad } from '../../../../rejson/entities/Squad';
import { squadType } from '../../types/squad';

const setOpenStatusInput = new GraphQLInputObjectType({
  name: 'SetOpenStatusInput',
  fields: () => ({
    squadId: { type: new GraphQLNonNull(GraphQLString) },
  }),
});

export const setSquadOpen = {
  type: squadType,
  description:
    'Sets a squad to "open" for 30 minutes, which means anyone with a link can join the squad',
  args: {
    input: { type: setOpenStatusInput },
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
    await squad.setOpen();
    return squad;
  },
};
