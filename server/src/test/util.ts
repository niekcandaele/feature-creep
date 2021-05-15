import { datatype } from 'faker';

import { defaultQuestions } from '../redisearch/client';
import { Person } from '../rejson/entities/Person';
import { Session } from '../rejson/entities/Session';
import { Squad } from '../rejson/entities/Squad';

/**
 * Utility to faster create an actor in tests.
 */
export async function createPerson(
  name: 'harry' | 'ron' | 'draco'
): Promise<Person> {
  switch (name) {
    case 'harry':
      return Person.create({
        firstName: 'Harry',
        lastName: 'Potter',
        email: 'harry.potter@wizard.net',
      });
    case 'ron':
      return Person.create({
        firstName: 'Ron',
        lastName: 'Weasley',
        email: 'ron.weasley@wizard.net',
      });
    case 'draco':
      return Person.create({
        firstName: 'Draco',
        lastName: 'Malfoy',
        email: 'draco.malfoy@wizard.net',
      });
  }
}

export async function setUpTestData(
  amountOfSessions = 10,
  endSessions = false
) {
  const squad = await Squad.create({ name: 'testers' });
  const harry = await createPerson('harry');
  const ron = await createPerson('ron');
  const draco = await createPerson('draco');

  const sessions: Session[] = [];

  for (let i = 0; i < amountOfSessions; i++) {
    const session = await Session.create({ squad });
    for (const q of defaultQuestions) {
      const question = await session.addQuestion(q);
      for (const person of [harry, ron, draco]) {
        await session.answerQuestion(
          question.id,
          person.id,
          datatype.number({ min: 0, max: 2 })
        );
      }
    }

    if (endSessions) {
      await session.end();
    }
    sessions.push(session);
  }

  return { sessions, squad, persons: { harry, ron, draco } };
}

export async function wait(seconds = 0.5) {
  return new Promise((resolve) => {
    setTimeout(resolve, seconds * 1000);
  });
}
