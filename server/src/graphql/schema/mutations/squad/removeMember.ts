import { UserInputError } from 'apollo-server';
import { GraphQLInputObjectType, GraphQLNonNull, GraphQLString } from 'graphql';

import { IContext } from '../../..';
import { Person } from '../../../../rejson/entities/Person';
import { Squad } from '../../../../rejson/entities/Squad';
import { squadType } from '../../types/squad';

const removeMemberType = new GraphQLInputObjectType({
  name: 'RemoveMemberType',
  fields: () => ({
    personId: { type: new GraphQLNonNull(GraphQLString) },
    squadId: { type: new GraphQLNonNull(GraphQLString) },
  }),
});

export const removeMemberFromSquadMutation = {
  type: squadType,
  args: {
    input: { type: removeMemberType },
  },
  resolve: async (
    parent: Record<string, never>,
    args: {
      input: { squadId: string; personId: string };
    },
    context: IContext
  ) => {
    const squad = await Squad.findOne(args.input.squadId);
    const person = await Person.findOne(args.input.personId);

    if (!squad) throw new UserInputError('Squad does not exist');
    if (!person) throw new UserInputError('Person does not exist');

    await squad.removeMember(person);

    return Squad.findOne(args.input.squadId);
  },
};
