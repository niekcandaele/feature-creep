import { promises as fs } from 'fs';
import { join } from 'path';

import { getDb } from '../rejson/db';

export enum GearsFunctions {
    'test' = 'test.py',
}

enum BackgroundFunctions {
    'generateReport' = 'generate_report.py'
}

export class GearsClient {
    private funcCache: Record<string, string> = {};

    public async initialize() {
        await this.registerFunctions();
    }

    private getfunctionPath(file: GearsFunctions | BackgroundFunctions) {
        return join(__dirname, `functions/${file}`);
    }

    /**
     * This registers Redis gears used for background processing (think event processors or batch jobs as 'cron jobs')
     * It includes deduplication logic, to make sure each function is only registered once
     */
    private async registerFunctions() {
        const db = await getDb();
        const registrations = await db.send_command('RG.DUMPREGISTRATIONS');

        const backgroundFunctionNames: string[] = Object.values(BackgroundFunctions).map(val => val);
        const registeredFunctions: string[] = registrations.map((r: unknown[]) => r[5]);

        for (const functionName of backgroundFunctionNames) {
            if (!registeredFunctions.includes(functionName)) {
                console.log(`[GEARS] Background function ${functionName} is not registered yet, doing it.`);
                await this.execute(functionName as BackgroundFunctions);
            }
        }
    }

    /**
     * Runs a function immediately
     * @param file
     */
    public async runJob(file: GearsFunctions) {
        return this.execute(file);
    }

    /**
     * Loads a function into memory
     * Utilizes a cache to prevent re-reading the same files over and over again
     * Lazy loads functions too
     */
    private async loadFunction(file: GearsFunctions | BackgroundFunctions) {
        if (!this.funcCache[file]) {
            console.log(`[GEARS] ${file} is not loaded yet, loading into cache now`);
            this.funcCache[file] = (await fs.readFile(this.getfunctionPath(file))).toString();
        }

        return this.funcCache[file];
    }

    /**
     * Calls RG.PYEXECUTE which will either run a function immediately or register it for background processing
     * @see https://oss.redislabs.com/redisgears/commands.html#rgpyexecute
     */
    private async execute(file: GearsFunctions | BackgroundFunctions) {
        const db = await getDb();
        const func = await this.loadFunction(file);
        return db.send_command('RG.PYEXECUTE', func);
    }
}
