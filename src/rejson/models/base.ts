import { v4 as uuid } from 'uuid';

import { getDb } from '../db';
import { COMMANDS } from '../commands';

export class BaseModel {
  // @ts-expect-error (error: could possibly be undefined, but we are smarter and now it will be defined :) )
  public id: string;

  public static async findOne<T extends BaseModel>(this: new (...args: any[]) => T, id: string): Promise<T | null> {
    // this.name = Name of Generic subclass.
    const obj = await getDb().send_command(COMMANDS.JSON_GET, `${this.name}:${id}`);
    if (!obj) {
      return null;
    }
    const instance = new this(JSON.parse(obj));
    instance.id = id;
    return instance;
  }

  public static async create<T extends BaseModel>(this: new (...args: any[]) => T, opts: Partial<T>): Promise<T> {
    if (opts.id) {
      const obj = await getDb().send_command(COMMANDS.JSON_GET, `${this.name}:${opts.id}`);
      if (!obj) {
        throw new Error('the id that was given, does not exist.');
      }
      const instance = new this(JSON.parse(obj));
      instance.id = opts.id;
      return instance;
    }
    const id = uuid();

    await getDb().send_command(COMMANDS.JSON_SET, `${this.name}:${id}`, '.', JSON.stringify({ ...opts, id }));
    const instance = new this(opts);
    instance.id = id;
    return instance;
  }
}
