import { expect } from 'chai';
import { Redis } from 'ioredis';

import { clearDb, getDb } from './db';
import { Person } from './Person';
import { Squad } from './Squad';
import { createPerson } from './util';

describe('Squad', () => {
  let client: Redis;

  beforeEach(async () => {
    client = await getDb();
    await clearDb();
  });

  after(async () => {
    await clearDb();
    client.disconnect();
  });

  it('Create squad', async () => {
    const squad = await Squad.create({ name: 'gryffindor' });
    const res = await client.send_command('JSON.GET', `Squad:${squad.id}`, '.name');

    if (!res) {
      throw new Error('Squad is null')
    }

    expect(JSON.parse(res)).to.be.equal('gryffindor');
  });

  it('Should find existing squad', async () => {
    const squad = await Squad.create({ name: 'gryffindor' });
    const result = await Squad.findOne(squad.id);

    expect(squad).to.be.instanceOf(Squad)
    expect(result).to.be.eql(squad)
  });

  it('Add Person to squad', async () => {

    const squad = await Squad.create({ name: 'gryffindor' });
    const person = await createPerson('harry');
    await squad.addMember(person);

    const res = await client.send_command(`JSON.GET`, `Squad:${squad.id}`, '.members')

    if (!res) {
      throw new Error('Squad is null')
    }

    expect(JSON.parse(res)[0]).to.be.equal(person.id);
  });

  it('Does not add the same person twice', async () => {


    const squad = await Squad.create({ name: 'gryffindor' });
    const person = await createPerson('harry');
    await squad.addMember(person);
    await squad.addMember(person);

    const res = await client.send_command(`JSON.GET`, `Squad:${squad.id}`, '.members')

    if (!res) {
      throw new Error('Squad is null')
    }

    expect(JSON.parse(res)[0]).to.be.equal(person.id);
    expect(JSON.parse(res)).to.have.length(1)
  });


  it('Can edit properties of a squad', async () => {

    const squad = await Squad.create({ name: 'gryffindor' });
    await squad.edit({ name: 'slytherin' });

    const res = await client.send_command(`JSON.GET`, `Squad:${squad.id}`, '.name')

    expect(JSON.parse(res)).to.be.equal('slytherin')
  })

  it('Can delete members from a squad', async () => {
    const squad = await Squad.create({ name: 'gryffindor' })
    const person = await createPerson('harry');
    await squad.addMember(person);

    let res = await client.send_command(`JSON.GET`, `Squad:${squad.id}`, '.members')

    if (!res) {
      throw new Error('Squad is null')
    }

    expect(JSON.parse(res)).to.have.length(1)
    expect(JSON.parse(res)[0]).to.be.equal(person.id);

    await squad.deleteMember(person)


    res = await client.send_command(`JSON.GET`, `Squad:${squad.id}`, '.members')

    if (!res) {
      throw new Error('squad is null')
    }

    expect(JSON.parse(res)).to.have.length(0)
  })

  it('Can get a list of members', async () => {

    const squad = await Squad.create({ name: 'gryffindor' })
    const harry = await createPerson('harry');
    await squad.addMember(harry);

    const ron = await createPerson('ron');
    await squad.addMember(ron);

    const members = await squad.getMembers();

    expect(members).to.be.an('array');
    expect(members[0]).to.be.instanceOf(Person)
    expect(members[0]).to.be.eql(harry)

  });

  it('Can delete a member from a squad', async () => {
    const squad = await Squad.create({ name: 'gryffindor' })
    const harry = await createPerson('harry');
    await squad.addMember(harry);

    const ron = await createPerson('ron');
    await squad.addMember(ron);

    let members = await squad.getMembers();
    expect(members).to.be.an('array');
    expect(members).to.have.length(2)
    expect(members[0]).to.be.eql(harry)
    expect(members[1]).to.be.eql(ron)

    // remove harry from the Squad
    await squad.deleteMember(harry);

    members = await squad.getMembers();
    expect(members).to.be.an('array');
    expect(members).to.have.length(1)
    expect(members[0]).to.be.eql(ron)

  });

  it('Handles well if we try to delete a member from a Squad thats not part of the Squad', async () => {

    const squad = await Squad.create({ name: 'gryffindor' })
    const harry = await createPerson('harry');
    await squad.addMember(harry);

    const ron = await createPerson('ron');
    let members = await squad.getMembers();

    expect(members).to.be.an('array');
    expect(members).to.have.length(1)
    expect(members[0]).to.be.eql(harry)

    await squad.deleteMember(ron)
    members = await squad.getMembers();
    expect(members).to.be.an('array');
    expect(members).to.have.length(1)
    expect(members[0]).to.be.eql(harry)
  })
});
