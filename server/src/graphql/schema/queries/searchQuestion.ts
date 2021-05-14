import {
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';

import { IContext } from '../..';
import { RediSearch } from '../../../redisearch/client';

const search = new RediSearch();

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
    await search.init();
    const res = await search.search(args.search, { onlyTitle: false });
    return res;
  },
};
