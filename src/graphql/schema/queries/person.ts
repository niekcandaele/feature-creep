import { GraphQLNonNull, GraphQLString } from 'graphql';

import { Person } from '../../../rejson/entities/Person';
import { personType } from '../types/person';

export const personQuery = {
    type: personType,
    args: {
        id: {
            type: new GraphQLNonNull(GraphQLString)
        }
    },
    resolve: (
        parent: Record<string, never>,
        args: { [argName: string]: string }
    ) => {
        return Person.findOne(args.id);
    },
};
