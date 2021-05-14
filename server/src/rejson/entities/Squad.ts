import { AuthenticationError } from 'apollo-server';

import { JsonCommands } from '../commands';
import { getDb } from '../db';
import { BaseEntity } from './BaseEntity';
import { Person } from './Person';
import { Session } from './Session';

interface SquadOpts {
  id: string;
  name: string;
  members: string[];
  notificationConfig: {
    discordWebhook: string;
  };
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
  public notificationConfig: {
    discordWebhook: string;
  };

  public open: boolean | null = null;
  public activeSession: Session | undefined = undefined;

  public sessions: Session[] = [];

  constructor(opts: SquadOpts) {
    super(opts);
    this.name = opts.name;
    this.members = opts.members || [];
    this.notificationConfig = opts.notificationConfig || {};
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
    await this.isReady;

    if (!this.open) {
      throw new AuthenticationError(
        'Cannot add a person to a squad that is not open'
      );
    }

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

  public async setOpen(): Promise<Squad> {
    const halfHour = 1000 * 60 * 30;
    await getDb().set(`Squad:${this.id}:open`, 'true', 'PX', halfHour);
    this.open = true;
    console.log(`Set Squad ${this.id} to open`);
    return this;
  }

  public async getActiveSession(): Promise<Session | undefined> {
    // TODO: This has pretty bad performance...
    const sessions = await Session.findAll();
    const squadId = this.id;
    const session = sessions.find((s) => s.squad.id === squadId && s.active);
    this.activeSession = session;
    return session;
  }

  async init() {
    const openStatus = await getDb().get(`Squad:${this.id}:open`);
    this.open = openStatus ? JSON.parse(openStatus) : false;

    const sessions = await Session.findAll();
    this.sessions = sessions.filter((s) => s.squad.id === this.id);
  }
  async afterCreate() {
    return this;
  }
}
