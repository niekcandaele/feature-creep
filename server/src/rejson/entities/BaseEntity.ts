import { v4 as uuid } from 'uuid';

import { JsonCommands } from '../commands';
import { getDb } from '../db';

/**
 * Base Modal for all models.
 */
export abstract class BaseEntity {
  public isReady: Promise<unknown>;

  constructor(opts: { id: string }) {
    this.id = opts.id;
    this.isReady = new Promise((resolve, reject) => {
      this.initialize().then(resolve).catch(reject);
    });
  }
  //------------------------
  // Properties
  //------------------------

  public id: string;

  //------------------------
  // Public Static Methods
  //------------------------

  async save() {
    // @ts-expect-error It works ¯\_(ツ)_/¯
    const field = `${this.__proto__.constructor.name}:${this.id}`;
    await getDb().send_command(
      JsonCommands.Set,
      field,
      '.',
      JSON.stringify(this)
    );
    return this;
  }

  /**
   * Find first entity that matches.
   * this.name = Name of Generic sub class.
   */

  public static async findOne<T extends BaseEntity>(
    this: new (...args: any[]) => T,
    id: string
  ): Promise<T | null> {
    const obj = await getDb().send_command(
      JsonCommands.Get,
      `${this.name}:${id}`
    );
    if (!obj) {
      return null;
    }

    const instance = new this({ ...JSON.parse(obj), id });
    await instance.isReady;
    return instance;
  }

  /**
   * Creates a new entity instance.
   */
  public static async create<T extends BaseEntity>(
    this: new (...args: any[]) => T,
    opts: Partial<T>
  ): Promise<T> {
    if (opts.id) {
      const obj = await getDb().send_command(
        JsonCommands.Get,
        `${this.name}:${opts.id}`
      );
      if (obj) {
        const instance = new this({ ...JSON.parse(obj), id: opts.id });
        return instance;
      }
    } else {
      opts.id = uuid();
    }

    await getDb().send_command(
      JsonCommands.Set,
      `${this.name}:${opts.id}`,
      '.',
      JSON.stringify({ squads: [], ...opts })
    );
    const instance = new this({ ...opts, id: opts.id });
    await instance.isReady;
    return instance;
  }

  /**
   * Remove an entity instance from the database based on Id.
   */
  public static async remove<T extends BaseEntity>(
    this: new (...args: any[]) => T,
    id: string
  ): Promise<boolean> {
    return await getDb().send_command(JsonCommands.Del, `${this.name}:${id}`);
  }

  public static async findAll<T extends BaseEntity>(
    this: new (...args: any[]) => T
  ): Promise<T[]> {
    const obj = await getDb().scan('', 'MATCH', `${this.name}:*`);
    const data = obj[1].map((_) => getOne(_));
    return (await Promise.all(data)).map((_) => new this(_));
  }

  protected async initialize() {
    await this.init();
  }

  abstract init<T extends BaseEntity>(): Promise<void>;
}

// TODO:
// Its here because I had a bunch of trouble figuring out how to call a static method from another static method
// Theres probably a better to do this
async function getOne(key: string) {
  const obj = await getDb().send_command(JsonCommands.Get, key);
  if (!obj) {
    return null;
  }
  return JSON.parse(obj);
}
