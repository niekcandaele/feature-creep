import { expect } from 'chai';

import { createPerson } from '../../test/util';
import { JsonCommands } from '../commands';
import { getDb } from '../db';
import { Person } from './Person';

describe('Person', () => {
  it('Should create a person', async () => {
    const harry = await createPerson('harry');
    const res = JSON.parse(
      await getDb().send_command(JsonCommands.Get, `Person:${harry.id}`)
    );

    expect(harry).to.be.instanceOf(Person);
    expect(res).to.be.eql(JSON.parse(JSON.stringify(harry)));
  });

  it('Should find an existing person', async () => {
    const harry = await Person.create({
      firstName: 'Harry',
      lastName: 'Potter',
      email: 'harry.potter@wizard.net',
    });
    const result = await Person.findOne(harry.id);

    expect(harry).to.be.instanceOf(Person);
    expect(result).to.be.eql(harry);
  });

  it('Should change properties of a person', async () => {
    const person = await createPerson('harry');
    await person.edit({ firstName: 'ron' });

    const res = await getDb().send_command(
      'JSON.GET',
      `Person:${person.id}`,
      '.firstName'
    );
    expect(JSON.parse(res)).to.be.equal('ron');
  });
});
