import { GraphQLObjectType } from 'graphql';

import { editPersonMutation } from './mutations/person/edit';
import { addMemberToSquadMutation } from './mutations/squad/addMember';
import { removeMemberFromSquadMutation } from './mutations/squad/removeMember';

export const mutationType = new GraphQLObjectType({
  name: 'Mutation',
  //@ts-expect-error
  fields: () => ({
    editPerson: editPersonMutation,
    addMemberToSquad: addMemberToSquadMutation,
    removeMemberFromSquad: removeMemberFromSquadMutation,
  }),
});
