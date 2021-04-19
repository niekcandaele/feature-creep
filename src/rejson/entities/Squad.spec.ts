import { expect } from 'chai';
import { Redis } from 'ioredis';

import { clearDb, getDb } from '../db';
import { Person } from './Person';
import { Squad } from './Squad';
import { createPerson } from '../util';

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

  it('Should create a squad', async () => {
    const squad = await Squad.create({ name: 'gryffindor' });
    const res = await client.send_command(
      'JSON.GET',
      `Squad:${squad.id}`,
      '.name'
    );

    if (!res) {
      throw new Error('Squad is null');
    }
    expect(JSON.parse(res)).to.be.equal('gryffindor');
  });

  it('Should find an existing squad', async () => {
    const squad = await Squad.create({ name: 'gryffindor' });
    const result = await Squad.findOne(squad.id);

    expect(squad).to.be.instanceOf(Squad);
    expect(result).to.be.eql(squad);
  });

  it('Should add a person to a squad', async () => {
    const squad = await Squad.create({ name: 'gryffindor' });
    const person = await createPerson('harry');
    await squad.addMember(person);

    const result = await client.send_command(
      'JSON.GET',
      `Squad:${squad.id}`,
      '.members'
    );

    if (!result) {
      throw new Error('Squad is null');
    }

    expect(JSON.parse(result)[0]).to.be.equal(person.id);
  });

  it('Should not add the same person twice to the same squad.', async () => {
    const squad = await Squad.create({ name: 'gryffindor' });
    const person = await createPerson('harry');
    await squad.addMember(person);
    await squad.addMember(person);

    const result = await client.send_command(
      'JSON.GET',
      `Squad:${squad.id}`,
      '.members'
    );

    if (!result) {
      throw new Error('Squad is null');
    }

    expect(JSON.parse(result)[0]).to.be.equal(person.id);
    expect(JSON.parse(result)).to.have.length(1);
  });

  it('Should change properties of a squad', async () => {
    const squad = await Squad.create({ name: 'gryffindor' });
    await squad.edit({ name: 'slytherin' });

    const result = await client.send_command(
      'JSON.GET',
      `Squad:${squad.id}`,
      '.name'
    );
    expect(JSON.parse(result)).to.be.equal('slytherin');
  });

  it('Should delete a member from a squad', async () => {
    const squad = await Squad.create({ name: 'gryffindor' });
    const person = await createPerson('harry');
    await squad.addMember(person);

    let result = await client.send_command(
      'JSON.GET',
      `Squad:${squad.id}`,
      '.members'
    );

    if (!result) {
      throw new Error('Squad is null');
    }

    expect(JSON.parse(result)).to.have.length(1);
    expect(JSON.parse(result)[0]).to.be.equal(person.id);

    await squad.removeMember(person);
    result = await client.send_command(
      'JSON.GET',
      `Squad:${squad.id}`,
      '.members'
    );

    if (!result) {
      throw new Error('squad is null');
    }

    expect(JSON.parse(result)).to.have.length(0);
  });

  it('Should get a list of members of a squad', async () => {
    const squad = await Squad.create({ name: 'gryffindor' });
    const harry = await createPerson('harry');
    await squad.addMember(harry);

    const ron = await createPerson('ron');
    await squad.addMember(ron);

    const members = await squad.getMembers();

    expect(members).to.be.an('array');
    expect(members[0]).to.be.instanceOf(Person);
    expect(members[0]).to.be.eql(harry);
  });

  it('Should delete a member from a squad', async () => {
    const squad = await Squad.create({ name: 'gryffindor' });
    const harry = await createPerson('harry');
    await squad.addMember(harry);

    const ron = await createPerson('ron');
    await squad.addMember(ron);

    let members = await squad.getMembers();
    expect(members).to.be.an('array');
    expect(members).to.have.length(2);
    expect(members[0]).to.be.eql(harry);
    expect(members[1]).to.be.eql(ron);

    // remove harry from the Squad
    await squad.removeMember(harry);

    members = await squad.getMembers();
    expect(members).to.be.an('array');
    expect(members).to.have.length(1);
    expect(members[0]).to.be.eql(ron);
  });

  it('Should handle removing a member from a squad that is not part of that squad correctly', async () => {
    const squad = await Squad.create({ name: 'gryffindor' });
    const harry = await createPerson('harry');
    await squad.addMember(harry);

    const ron = await createPerson('ron');
    let members = await squad.getMembers();

    expect(members).to.be.an('array');
    expect(members).to.have.length(1);
    expect(members[0]).to.be.eql(harry);

    await squad.removeMember(ron);
    members = await squad.getMembers();
    expect(members).to.be.an('array');
    expect(members).to.have.length(1);
    expect(members[0]).to.be.eql(harry);
  });
});
