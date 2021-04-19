import { GraphQLObjectType, GraphQLString } from 'graphql';

export const personType = new GraphQLObjectType({
    name: 'Person',
    description: 'A person',
    fields: {
        // Falsehoods programmers believe about names: Everyone has a first and last name :-)
        firstName: {
            type: GraphQLString
        },
        lastName: {
            type: GraphQLString
        },
        email: {
            type: GraphQLString
        }

    },
});
