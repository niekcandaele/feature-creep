import { Person } from '../../../rejson/entities/Person';
import { personType } from '../types/person';

export const personQuery = {
  type: personType,
  args: {},
  resolve: (
    parent: Record<string, never>,
    args: { [argName: string]: string },
    context: any
  ) => {
    return Person.findOne(context.user.id);
  },
};
