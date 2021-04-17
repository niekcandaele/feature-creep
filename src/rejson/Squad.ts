import { getDb } from './db';
import { COMMANDS } from './commands';
import { BaseModel } from './models/base';
import { Person } from './Person';

interface SquadOpts {
  name: string;
}

export class Squad extends BaseModel {

  public name: string;

  constructor(opts: SquadOpts) {
    super();
    this.name = opts.name;
  }

  public async getMembers(): Promise<Person[]> {

    // check if members array exists
    const exists = await getDb().send_command(COMMANDS.JSON_ARR_LEN, `Squad:${this.id}`, '.members');
    if (exists === null) return [];

    const personIds: string[] = JSON.parse(await getDb().send_command(COMMANDS.JSON_GET, `Squad:${this.id}`, '.members'));
    if (personIds.length === 0) return [];

    const mapIds = personIds.map(_ => `Person:${_}`)
    const res = await getDb().send_command(COMMANDS.JSON_MGET, ...mapIds, '.');
    return Promise.all(res.map((_: string) => {
      return Person.create(JSON.parse(_));
    }))
  }

  public async edit(editProps: Partial<Squad>) {
    const Squad = await getDb().send_command(COMMANDS.JSON_GET, `Squad:${this.id}`) as Squad;
    await getDb().send_command(COMMANDS.JSON_SET, `Squad:${this.id}`, '.', JSON.stringify({ ...Squad, ...editProps }));
  }

  public async addMember(person: Person) {

    // creates members array, only if it doesn't exist already.
    await getDb().send_command(COMMANDS.JSON_SET, `Squad:${this.id}`, '.members', "[]", 'NX');

    const index: number = await getDb().send_command(COMMANDS.JSON_ARR_INDEX, `Squad:${this.id}`, '.members', JSON.stringify(person.id));
    if (index === -1) { // person not found in array
      await getDb().send_command(COMMANDS.JSON_ARR_APPEND, `Squad:${this.id}`, '.members', JSON.stringify(person.id));
    }
    // member was already part of the Squad.
  }

  public async deleteMember(person: Person) {
    const index = await getDb().send_command(COMMANDS.JSON_ARR_INDEX, `Squad:${this.id}`, '.members', JSON.stringify(person.id));
    if (index !== -1) {
      await getDb().send_command(COMMANDS.JSON_ARR_POP, `Squad:${this.id}`, '.members', index);
    }
  }
}