import { GraphQLInputObjectType, GraphQLString } from 'graphql';

import { IContext } from '../../..';
import { Person } from '../../../../rejson/entities/Person';
import { personType } from '../../types/person';

const editType = new GraphQLInputObjectType({
  name: 'EditPersonType',
  fields: () => ({
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
  }),
});

export const editPersonMutation = {
  type: personType,
  args: {
    person: { type: editType },
  },
  resolve: async (
    parent: Record<string, never>,
    args: {
      person: Record<string, unknown>;
    },
    context: IContext
  ) => {
    await context.user.edit(args.person);
    return Person.findOne(context.user.id);
  },
};
