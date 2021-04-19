import { GraphQLObjectType } from 'graphql';

export const mutationType = new GraphQLObjectType({
    name: 'Mutation',
    fields: () => ({
    }),
});
