import { expect } from 'chai';
import { datatype } from 'faker';

import { getDb } from '../rejson/db';
import { Session } from '../rejson/entities/Session';
import { Squad } from '../rejson/entities/Squad';
import { createPerson } from '../test/util';
import { GearsClient, GearsFunctions } from './gears';

/**
 * Unloads any registered Gears functions
 */
async function clearRegistrations() {
  const db = await getDb();

  const registrations = await db.send_command('RG.DUMPREGISTRATIONS');

  for (const registration of registrations) {
    const id = registration[1];
    await db.send_command('RG.UNREGISTER', id);
  }
}

async function setUp(amountOfSessions = 10) {
  // Since we use Redis Gears for generating session reports
  // We need practically every test to have access to a completed session
  const squad = await Squad.create({ name: 'Gears testers' });
  const harry = await createPerson('harry');
  const ron = await createPerson('ron');
  const draco = await createPerson('draco');

  // Questions based on https://engineering.atspotify.com/2014/09/16/squad-health-check-model/
  const questions = [
    'Delivering value',
    'Easy to release',
    'Fun',
    'Health of codebase',
    'Learning',
    'Mission',
    'Pawns or players',
    'Speed',
  ];

  const sessions: Session[] = [];

  for (let i = 0; i < amountOfSessions; i++) {
    const session = await Session.create({ squad });
    for (const q of questions) {
      const question = await session.addQuestion(q);
      for (const person of [harry, ron, draco]) {
        await session.answerQuestion(
          question.id,
          person.id,
          datatype.number({ min: 0, max: 3 }).toString()
        );
      }
    }
    sessions.push(session);
  }

  return sessions;
}

let Gears: GearsClient;

describe('Redis Gears', () => {
  beforeEach(async () => {
    await clearRegistrations();
    Gears = new GearsClient();
    await Gears.initialize();
  });
  it('Executes a simple example', async () => {
    const res = await Gears.runJob(GearsFunctions.test);
    expect(res).to.be.an('array');
    expect(res).to.have.length(2);
  });
  it('Only registers BG functions once', async () => {
    const db = await getDb();

    const registrations = await db.send_command('RG.DUMPREGISTRATIONS');

    expect(registrations).to.be.an('array');
    // There should at least be something loaded
    expect(registrations.length).to.be.greaterThan(0);
    const secondClient = new GearsClient();
    await secondClient.initialize();
    const registrationsAfter = await db.send_command('RG.DUMPREGISTRATIONS');
    expect(registrations).to.be.an('array');
    // It should have the same amount of registrations after calling initialize
    expect(registrationsAfter.length).to.be.equal(registrations.length);
  });
  it('Can generate a report', async function () {
    this.timeout(60000);
    const sessions = await setUp();

    for (const session of sessions) {
      await session.end();
      // Gears does async processing, hard to "await" that properly
      await wait();
      const sessionAfter = await Session.findOne(session.id);
      if (!sessionAfter) throw new Error('session undefined');

      const totals = await sessionAfter.getTotals();

      for (const key in totals) {
        if (Object.prototype.hasOwnProperty.call(totals, key)) {
          // Since there's 3 squad members
          // Who each vote 0-3 on questions,
          // these are the minimum and maximums
          expect(totals[key]).to.be.greaterThanOrEqual(0);
          expect(totals[key]).to.be.lessThanOrEqual(9);

          const question = sessionAfter.questions.find((q) => q.id === key);
          if (!question) throw new Error('question undefined');

          const total = question.answers.reduce(
            (a, b) => a + parseInt(b.answer, 10),
            0
          );
          expect(total).to.be.equal(totals[key]);
        }
      }
    }
  });
});

async function wait(seconds = 1) {
  return new Promise((resolve) => {
    setTimeout(resolve, seconds * 1000);
  });
}
