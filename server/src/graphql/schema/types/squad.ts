import { GraphQLList, GraphQLObjectType, GraphQLString } from 'graphql';

export const squadType = new GraphQLObjectType({
    name: 'Squad',
    description: 'A squad',
    fields: {
        id: {
            type: GraphQLString
        },
        name: {
            type: GraphQLString,
        },
        members: {
            type: new GraphQLList(GraphQLString),
        },
    },
});
