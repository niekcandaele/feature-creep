import { expect } from 'chai';
import { datatype } from 'faker';

import { Session } from '../rejson/entities/Session';
import { Squad } from '../rejson/entities/Squad';
import { createPerson } from '../test/util';
import { executeGears, GearsFunctions } from './execute';

async function setUp(amountOfSessions = 10) {
    // Since we use Redis Gears for generating session reports
    // We need practically every test to have access to a completed session
    const squad = await Squad.create({ name: 'Gears testers' });
    const harry = await createPerson('harry');
    const ron = await createPerson('ron');
    const draco = await createPerson('draco');

    const questions = [
        'Delivering value',
        'Easy to release',
        'Fun',
        'Health of codebase',
        'Learning',
        'Mission',
        'Pawns or players',
        'Speed'
    ];

    const sessions: Session[] = [];

    for (let i = 0; i < amountOfSessions; i++) {
        const session = await Session.create({ squad });
        for (const q of questions) {
            const question = await session.addQuestion(q);
            for (const person of [harry, ron, draco]) {
                await session.answerQuestion(question.id, person.id, datatype.number({ min: 0, max: 3 }).toString());
            }
        }
        sessions.push(session);
    }

    return sessions;
}

describe('Redis Gears', () => {
    it('Executes a simple example', async () => {
        const res = await executeGears(GearsFunctions.test);
        expect(res).to.be.an('array');
        expect(res).to.have.length(2);
    });
    it('Generates a report of multiple sessions', async () => {
        await setUp();
        const res = await executeGears(GearsFunctions.generateReport);
        console.log(res);
    });
});
