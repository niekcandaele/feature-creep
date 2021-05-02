import { JsonCommands } from '../commands';
import { getDb } from '../db';
import { BaseEntity } from './BaseEntity';
import { Person } from './Person';

interface SquadOpts {
  name: string;
  members: string[];
}

/*
 * Squad entity
 *
 */
export class Squad extends BaseEntity {
  //------------------------
  // Properties
  //------------------------
  public name: string;
  public members: string[];

  constructor(opts: SquadOpts) {
    super();
    this.name = opts.name;
    this.members = opts.members || [];
  }
  //------------------------
  // Public Methods
  //------------------------

  /**
   * Retrieve members from current squad.
   */
  public async getMembers(): Promise<Person[]> {
    const members = this.members.map((m) => Person.findOne(m));
    const resMembers = await Promise.all(members);
    return resMembers.filter((_) => !!_) as Person[];
  }

  /**
   * Edit properties of current squad.
   */
  public async edit(editProps: Partial<Squad>): Promise<void> {
    const squad: Squad = await getDb().send_command(
      JsonCommands.Get,
      `Squad:${this.id}`
    );
    await getDb().send_command(
      JsonCommands.Set,
      `Squad:${this.id}`,
      '.',
      JSON.stringify({ ...squad, ...editProps })
    );
  }

  /**
   * Add a member to the current squad.
   */
  public async addMember(person: Person): Promise<void> {
    if (this.members.includes(person.id)) {
      // Dont add the same person twice
      return;
    }
    this.members.push(person.id);
    await this.save();

    // Save the squad to Person aswell
    await person.edit({ squads: [this.id, ...person.squads] });
  }
  /**
   * Remove a member from the current squad.
   */
  public async removeMember(person: Person): Promise<void> {
    this.members = this.members.filter((_) => _ !== person.id);
    await this.save();

    await person.edit({ squads: person.squads.filter((_) => _ !== this.id) });
  }
}
