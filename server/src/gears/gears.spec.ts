import { expect } from 'chai';

import { getDb } from '../rejson/db';
import { Session } from '../rejson/entities/Session';
import { setUpTestData, wait } from '../test/util';
import { GearsTest } from './functions/test';
import { GearsClient } from './gears';

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

let Gears: GearsClient;

describe('Redis Gears', () => {
  beforeEach(async () => {
    await clearRegistrations();
    Gears = new GearsClient();
    await Gears.initialize();
  });
  it('Executes a simple example', async () => {
    const res = await Gears.runJob(new GearsTest());
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
    const sessions = await setUpTestData();

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
