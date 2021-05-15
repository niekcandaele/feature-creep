import {
  GraphQLFloat,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';

import { IContext } from '../..';
import { timeseries } from '../../..';

export const timeseriesType = new GraphQLObjectType({
  name: 'Timeseries',
  description: 'A timeseries datapoint',
  fields: {
    timestamp: {
      type: GraphQLString,
    },
    value: {
      type: GraphQLFloat,
    },
  },
});

export const timeseriesQuery = {
  type: new GraphQLList(timeseriesType),
  args: {
    squadId: { type: new GraphQLNonNull(GraphQLString) },
    questionName: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve: async (
    parent: Record<string, never>,
    args: { squadId: string; questionName: string },
    context: IContext
  ) => {
    const res = await timeseries.query(args.squadId, args.questionName, {});
    return res;
  },
};
