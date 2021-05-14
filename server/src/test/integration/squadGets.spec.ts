import { expect } from 'chai';

import { Squad } from '../../rejson/entities/Squad';
import { testClient } from '../testClient.spec';

describe('INTEGRATION squad query gets', () => {
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
      mutation,
      variables: {
        input: { name: 'coolste squad' },
      },
    });

    const squadId = createSquadRes.data.createSquad.id;
    console.log(`Created Squad: ${squadId}`);

    expect(squadId).to.be.a('string');

    await Squad.create({ name: 'unused squad' });

    const getMemberOfSquadsNoMember = `query {
            squads(filter: {filter: MEMBEROF}) {
                name
                id
              }
          }`;
    const memberOfSquadsResNoMember = await testClient.query({
      query: getMemberOfSquadsNoMember,
    });

    const memberOfSquadsNoMember = memberOfSquadsResNoMember.data.squads;
    expect(memberOfSquadsNoMember).to.be.an('array');
    expect(memberOfSquadsNoMember).to.have.length(1);

    const openSquadMutation = `mutation setSquadOpen {
      setSquadOpen(input:{
      squadId:"${squadId}"
      }) {
        id
        open
      }
    }`;

    await testClient.mutate({ mutation: openSquadMutation });

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
          squadId: squadId,
        },
      },
    });

    const squadWithMember = await Squad.findOne(squadId);
    if (!squadWithMember) throw new Error('no squad');
    const withMembers = await squadWithMember.getMembers();

    expect(withMembers).to.be.an('array');
    expect(withMembers).to.have.length(1);
    expect(withMembers[0].id).to.be.equal(personId);

    const getMemberOfSquads = `query {
            squads(filter: {filter: MEMBEROF}) {
                name
                id
              }
          }`;
    const memberOfSquadsRes = await testClient.query({
      query: getMemberOfSquads,
    });

    const memberOfSquads = memberOfSquadsRes.data.squads;
    expect(memberOfSquads).to.be.an('array');
    expect(memberOfSquads).to.have.length(1);
  });
});
