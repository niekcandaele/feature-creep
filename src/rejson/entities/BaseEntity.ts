import { v4 as uuid } from 'uuid';

import { getDb } from '../db';
import { JsonCommands } from '../commands';

/**
 * Base Modal for all models.
 */
export class BaseEntity {
  //------------------------
  // Properties
  //------------------------

  /**
  * Typescript warns that property 'Id' could be undefined.
  * But since an Id will be provided by parameters, or a new will be generated.
  * We can safely disable this warning.
  */

  // @ts-expect-error
  public id: string;

  //------------------------
  // Public Static Methods
  //------------------------

  /**
  * Find first entity that matches.
  * this.name = Name of Generic sub class.
  */

  public static async findOne<T extends BaseEntity>(this: new (...args: any[]) => T, id: string): Promise<T | null> {
    const obj = await getDb().send_command(JsonCommands.Get, `${this.name}:${id}`);
    if (!obj) {
      return null;
    }
    const instance = new this(JSON.parse(obj));
    instance.id = id;
    return instance;
  }

  /**
   * Creates a new entity instance.
   */
  public static async create<T extends BaseEntity>(this: new (...args: any[]) => T, opts: Partial<T>): Promise<T> {
    if (opts.id) {
      const obj = await getDb().send_command(JsonCommands.Get, `${this.name}:${opts.id}`);
      if (!obj) {
        throw new Error('the id that was given, does not exist.');
      }
      const instance = new this(JSON.parse(obj));
      instance.id = opts.id;
      return instance;
    }
    const id = uuid();

    await getDb().send_command(JsonCommands.Set, `${this.name}:${id}`, '.', JSON.stringify({ ...opts, id }));
    const instance = new this(opts);
    instance.id = id;
    return instance;
  }

  /**
  * Remove an entity instande from the database based on Id.
  */
  public static async remove<T extends BaseEntity>(this: new (...args: any[]) => T, id: string): Promise<boolean> {
    return await getDb().send_command(JsonCommands.Del, `${this.name}:${id}`);
  }
}
