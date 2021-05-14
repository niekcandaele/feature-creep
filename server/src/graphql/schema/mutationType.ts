import { GraphQLObjectType } from 'graphql';

import { editPersonMutation } from './mutations/person/edit';
import { addQuestion } from './mutations/session/addQuestion';
import { answerQuestion } from './mutations/session/answerQuestion';
import { createSession } from './mutations/session/createSession';
import { endSession } from './mutations/session/endSession';
import { addMemberToSquadMutation } from './mutations/squad/addMember';
import { createSquad } from './mutations/squad/createSquad';
import { removeMemberFromSquadMutation } from './mutations/squad/removeMember';
import { setNotificationConfig } from './mutations/squad/setNotificationConfig';
import { setSquadOpen } from './mutations/squad/setOpen';

export const mutationType = new GraphQLObjectType({
  name: 'Mutation',
  //@ts-expect-error
  fields: () => ({
    editPerson: editPersonMutation,
    addMemberToSquad: addMemberToSquadMutation,
    removeMemberFromSquad: removeMemberFromSquadMutation,
    createSquad: createSquad,
    createSession: createSession,
    addQuestion: addQuestion,
    answerQuestion: answerQuestion,
    endSession: endSession,
    setSquadOpen: setSquadOpen,
    setNotificationConfig: setNotificationConfig,
  }),
});
