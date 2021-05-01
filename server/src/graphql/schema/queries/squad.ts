import { UserInputError } from 'apollo-server';
import { GraphQLEnumType, GraphQLInputObjectType, GraphQLList } from 'graphql';

import { IContext } from '../..';
import { Squad } from '../../../rejson/entities/Squad';
import { squadType } from '../types/squad';

const getSquadType = new GraphQLInputObjectType({
  name: 'GetSquadInput',
  fields: () => ({
    filter: {
      type: new GraphQLEnumType({
        name: 'SquadFilterType',
        values: {
          MEMBEROF:
            { value: 'memberof' },
          ALL:
            { value: 'all' }
        }
      })
    }
  })
});

export const squadQuery = {
  type: new GraphQLList(squadType),
  args: {
    filter: { type: getSquadType }
  },
  resolve: (
    parent: Record<string, never>,
    args: any,
    context: IContext
  ) => {
    let filterMode = 'memberof';
    if (args && args.filter) {
      filterMode = args.filter.filter;
    }

    switch (filterMode) {
      case 'memberof':
        return Promise.all(context.user.squads.map((id) => Squad.findOne(id)));
      case 'all':
        return Squad.findAll();
      default:
        throw new UserInputError('Invalid filtermode');
    }
  },
};
