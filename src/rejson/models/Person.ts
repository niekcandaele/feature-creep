import { BaseModel } from './Base';
import { COMMANDS } from '../commands';
import { getDb } from '../db';

interface PersonOpts {
  firstName: string;
  lastName: string;
  email: string;
}

export class Person extends BaseModel {
  public firstName: string;
  public lastName: string;
  public email: string;

  constructor(opts: PersonOpts) {
    super();
    this.firstName = opts.firstName;
    this.lastName = opts.lastName;
    this.email = opts.email;
  }

  public async edit(editProps: Partial<Person>) {
    const person = await getDb().send_command(COMMANDS.JSON_GET, `Person:${this.id}`);
    await getDb().send_command(COMMANDS.JSON_SET, `Person:${this.id}`, '.', JSON.stringify({ ...person, ...editProps }));
  }
}
