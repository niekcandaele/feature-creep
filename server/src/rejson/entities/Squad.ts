import { getDb } from '../db';
import { JsonCommands } from '../commands';
import { BaseEntity } from './BaseEntity';
import { Person } from './Person';

interface SquadOpts {
  name: string;
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

  constructor(opts: SquadOpts) {
    super();
    this.name = opts.name;
  }
  //------------------------
  // Public Methods
  //------------------------

  /**
   * Retrieve members from current squad.
   */
  public async getMembers(): Promise<Person[]> {
    // check if members array exists
    const exists = await getDb().send_command(
      JsonCommands.ArrLen,
      `Squad:${this.id}`,
      '.members'
    );
    if (exists === null) return [];

    const personIds: string[] = JSON.parse(
      await getDb().send_command(
        JsonCommands.Get,
        `Squad:${this.id}`,
        '.members'
      )
    );
    if (personIds.length === 0) return [];

    const mapIds = personIds.map((_) => `Person:${_}`);
    const result = await getDb().send_command(
      JsonCommands.MGet,
      ...mapIds,
      '.'
    );
    return Promise.all(
      result.map((person: string) => {
        return Person.create(JSON.parse(person));
      })
    );
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
    // only create arr when it does not exist
    await getDb().send_command(
      JsonCommands.Set,
      `Squad:${this.id}`,
      '.members',
      '[]',
      'NX'
    );

    const index: number = await getDb().send_command(
      JsonCommands.ArrIndex,
      `Squad:${this.id}`,
      '.members',
      JSON.stringify(person.id)
    );
    if (index === -1) {
      await getDb().send_command(
        JsonCommands.ArrAppend,
        `Squad:${this.id}`,
        '.members',
        JSON.stringify(person.id)
      );
    }
  }
  /**
   * Remove a member from the current squad.
   */
  public async removeMember(person: Person): Promise<void> {
    const index: number = await getDb().send_command(
      JsonCommands.ArrIndex,
      `Squad:${this.id}`,
      '.members',
      JSON.stringify(person.id)
    );
    if (index !== -1) {
      await getDb().send_command(
        JsonCommands.ArrPop,
        `Squad:${this.id}`,
        '.members',
        index
      );
    }
  }
}
