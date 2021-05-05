import { JsonCommands } from '../commands';
import { getDb } from '../db';
import { BaseEntity } from './BaseEntity';

interface PersonOpts {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  squads: string[];
}

export class Person extends BaseEntity {
  //------------------------
  // Properties
  //------------------------
  public firstName: string;
  public lastName: string;
  public email: string;
  public squads: string[] = [];

  constructor(opts: PersonOpts) {
    super(opts);
    this.firstName = opts.firstName;
    this.lastName = opts.lastName;
    this.email = opts.email;
    this.squads = opts.squads || [];
  }

  //------------------------
  // public methods
  //------------------------

  /**
   * Edit properties of current Person.
   */
  public async edit(editProps: Partial<Person>): Promise<void> {
    const person = JSON.parse(
      await getDb().send_command(JsonCommands.Get, `Person:${this.id}`)
    );

    await getDb().send_command(
      JsonCommands.Set,
      `Person:${this.id}`,
      '.',
      JSON.stringify({ ...person, ...editProps })
    );
  }

  // TODO: Move to Base Entity
  // Have fun figuring it out :D
  public static async findOrCreate(
    id: string,
    data: Partial<Person>
  ): Promise<Person> {
    const current = await Person.findOne(id);
    if (current) return current;
    console.log(`Entity ${id} not found, creating a new one`);

    return Person.create(data);
  }

  async init() {}
}
