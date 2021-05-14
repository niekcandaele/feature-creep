import {
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';

import { IContext } from '../..';
import { getRediSearch } from '../../../redisearch/client';

export const searchQuery = {
  type: new GraphQLList(
    new GraphQLObjectType({
      name: 'SearchResponse',
      fields: {
        question: {
          type: GraphQLString,
        },
        descriptionBad: {
          type: GraphQLString,
        },
        descriptionGood: {
          type: GraphQLString,
        },
      },
    })
  ),
  args: {
    search: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve: async (
    parent: Record<string, never>,
    args: { search: string },
    context: IContext
  ) => {
    const search = await getRediSearch();

    const res = await search.search(args.search, { onlyTitle: false });
    return res;
  },
};
