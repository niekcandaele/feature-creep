import { GraphQLObjectType, GraphQLString } from 'graphql';

export const queryType = new GraphQLObjectType({
    name: 'Query',
    fields: () => ({
        ping: {
            type: GraphQLString,
            resolve() {
                return 'PONG!';
            },
        },
    }),
});
