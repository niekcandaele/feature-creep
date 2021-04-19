import { Person } from './entities/Person';

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
