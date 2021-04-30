import { expect } from 'chai';

import { Squad } from '../../rejson/entities/Squad';
import { testClient } from '../testClient.spec';

describe('INTEGRATION squad management', () => {
  it('Does the thing', async () => {
    const query = `query {
            person {
              id
            }
          }`;
    const personRes = await testClient.query({ query });
    const personId = personRes.data.person.id;
    console.log(`Person ID: ${personId}`);

    expect(personId).to.be.a('string');

    const mutation = `mutation test($input:CreateSquad){
      createSquad(input: $input) {
        name
        id
      }
    }`;

    const createSquadRes = await testClient.mutate({
      mutation, variables: {
        'input': { 'name': 'coolste squad' }
      }
    });

    const squadId = createSquadRes.data.createSquad.id;
    console.log(`Created Squad: ${squadId}`);

    expect(squadId).to.be.a('string');

    const addMemberMutation = `mutation test($input:AddMemberType){
      addMemberToSquad(input: $input) {
        name
      }
    }`;

    const addMemberRes = await testClient.mutate({
      mutation: addMemberMutation,
      variables: {
        input: {
          personId: personId,
          squadId: squadId
        }
      }
    });

    const squadWithMember = await Squad.findOne(squadId);
    if (!squadWithMember) throw new Error('no squad');
    const withMembers = await squadWithMember.getMembers();

    expect(withMembers).to.be.an('array');
    expect(withMembers).to.have.length(1);
    expect(withMembers[0].id).to.be.equal(personId);

    const removeMemberMutation = `mutation test($input:RemoveMemberType){
      removeMemberFromSquad(input: $input) {
        name
      }
    }`;

    const removeMemberRes = await testClient.mutate({
      mutation: removeMemberMutation,
      variables: {
        input: {
          personId: personId,
          squadId: squadId
        }
      }
    });

    const squadWithoutMembers = await Squad.findOne(squadId);
    if (!squadWithoutMembers) throw new Error('no squad');
    const withoutMembers = await squadWithoutMembers.getMembers();

    expect(withoutMembers).to.be.an('array');
    expect(withoutMembers).to.have.length(0);
  });
});
