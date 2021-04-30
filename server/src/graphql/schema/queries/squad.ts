import { GraphQLList } from 'graphql';

import { IContext } from '../..';
import { Squad } from '../../../rejson/entities/Squad';
import { squadType } from '../types/squad';

export const squadQuery = {
  type: new GraphQLList(squadType),
  args: {},
  resolve: (
    parent: Record<string, never>,
    args: { [argName: string]: string },
    context: IContext
  ) => {
    const squads = context.user.squads.map(id => Squad.findOne(id));
    return Promise.all(squads);
  },
};
