import { schema } from './schema';

const { ApolloServer, gql } = require('apollo-server');
export const server = new ApolloServer({
  schema,
  playground: true,
  introspection: true,
});
