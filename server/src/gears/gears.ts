import { promises as fs } from 'fs';
import { join } from 'path';

import { getDb } from '../rejson/db';
import { GearsGenerateReport } from './functions/generateReport';
import { GearsSendNotification } from './functions/sendNotification';
import { GearsFunction } from './GearsFunction';

const BackgroundFunctions = [
  new GearsSendNotification(),
  new GearsGenerateReport(),
];

export class GearsClient {
  private funcCache: Record<string, string> = {};

  public async initialize() {
    await this.registerFunctions();
  }

  private getfunctionPath(file: GearsFunction) {
    return join(__dirname, `functions/${file.fileName}`);
  }

  /**
   * This registers Redis gears used for background processing (think event processors or batch jobs as 'cron jobs')
   * It includes deduplication logic, to make sure each function is only registered once
   */
  private async registerFunctions() {
    const db = await getDb();
    const registrations = await db.send_command('RG.DUMPREGISTRATIONS');

    const registeredFunctions: string[] = registrations.map(
      (r: unknown[]) => r[5]
    );

    for (const bgFunction of BackgroundFunctions) {
      if (!registeredFunctions.includes(bgFunction.fileName)) {
        console.log(
          `[GEARS] Background function ${bgFunction.fileName} is not registered yet, doing it.`
        );
        await this.execute(bgFunction);
      }
    }
  }

  /**
   * Runs a function immediately
   * @param file
   */
  public async runJob(file: GearsFunction) {
    return this.execute(file);
  }

  /**
   * Loads a function into memory
   * Utilizes a cache to prevent re-reading the same files over and over again
   * Lazy loads functions too
   */
  private async loadFunction(file: GearsFunction) {
    if (!this.funcCache[file.fileName]) {
      console.log(
        `[GEARS] ${file.fileName} is not loaded yet, loading into cache now`
      );
      this.funcCache[file.fileName] = (
        await fs.readFile(this.getfunctionPath(file))
      ).toString();
    }

    return this.funcCache[file.fileName];
  }

  /**
   * Calls RG.PYEXECUTE which will either run a function immediately or register it for background processing
   * @see https://oss.redislabs.com/redisgears/commands.html#rgpyexecute
   */
  private async execute(gearsFunction: GearsFunction) {
    const db = await getDb();
    const func = await this.loadFunction(gearsFunction);

    if (gearsFunction.requirements.length) {
      return db.send_command(
        'RG.PYEXECUTE',
        func,
        'REQUIREMENTS',
        gearsFunction.requirements.join(',')
      );
    } else {
      return db.send_command('RG.PYEXECUTE', func);
    }
  }
}
