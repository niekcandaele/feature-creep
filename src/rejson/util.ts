import { Person } from './Person';

export async function createPerson(name: 'harry' | 'ron' | 'draco'): Promise<Person> {
  switch (name) {
    case 'harry':
      return Person.create({ firstName: 'Harry', lastName: 'Potter', email: 'harry.potter@wizard.net' })
    case 'ron':
      return Person.create({ firstName: 'Ron', lastName: 'Weasley', email: 'ron.weasley@wizard.net' });
    case 'draco':
      return Person.create({ firstName: 'Draco', lastName: 'Malfoy', email: 'draco.malfoid@wizard.net' });
    default:
      throw new Error('unknown name');
  }
}