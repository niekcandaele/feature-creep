import { promises as fs } from 'fs';
import { join } from 'path';

import { getDb } from '../rejson/db';

export enum GearsFunctions {
    'test' = 'test.py',
    'generateReport' = 'generateReport.py'
}

const funcCache: Record<string, string> = {};

export async function executeGears(file: GearsFunctions) {
    const db = await getDb();
    const func = await loadFunction(file);
    return db.send_command('RG.PYEXECUTE', func);
}

async function loadFunction(file: GearsFunctions) {
    if (!funcCache[file]) {
        console.log(`${file} is not loaded yet, loading into cache now`);
        const functionPath = join(__dirname, `functions/${file}`);
        funcCache[file] = (await fs.readFile(functionPath)).toString();
    }

    return funcCache[file];
}
