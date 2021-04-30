import { GraphQLObjectType } from 'graphql';

import { editPersonMutation } from './mutations/person/edit';

export const mutationType = new GraphQLObjectType({
  name: 'Mutation',
  //@ts-expect-error
  fields: () => ({
    editPerson: editPersonMutation,
  }),
});
