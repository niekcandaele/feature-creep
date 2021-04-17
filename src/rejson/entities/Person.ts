import { BaseEntity } from './BaseEntity';
import { JsonCommands } from '../commands';
import { getDb } from '../db';

interface PersonOpts {
  firstName: string;
  lastName: string;
  email: string;
}

export class Person extends BaseEntity {
  //------------------------
  // Properties
  //------------------------
  public firstName: string;
  public lastName: string;
  public email: string;

  constructor(opts: PersonOpts) {
    super();
    this.firstName = opts.firstName;
    this.lastName = opts.lastName;
    this.email = opts.email;
  }

  //------------------------
  // public methods
  //------------------------

  /**
   * Edit properties of current Person.
   */
  public async edit(editProps: Partial<Person>): Promise<void> {
    const person = await getDb().send_command(JsonCommands.Get, `Person:${this.id}`);
    await getDb().send_command(JsonCommands.Set, `Person:${this.id}`, '.', JSON.stringify({ ...person, ...editProps }));
  }
}
