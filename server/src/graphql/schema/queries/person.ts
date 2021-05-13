import { GraphQLString } from 'graphql';

import { IContext } from '../..';
import { Person } from '../../../rejson/entities/Person';
import { personType } from '../types/person';

export const personQuery = {
  type: personType,
  args: {
    id: { type: GraphQLString },
  },
  resolve: (
    parent: Record<string, never>,
    args: { id?: string },
    context: IContext
  ) => {
    if (args.id) { return Person.findOne(args.id); }

    return context.user;
  },
};
