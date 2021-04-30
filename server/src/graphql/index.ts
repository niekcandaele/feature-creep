import { ApolloServer, AuthenticationError } from 'apollo-server';
import * as jwt from 'jsonwebtoken';
import jwksClient from 'jwks-rsa';
import { promisify } from 'util';

import { Person } from '../rejson/entities/Person';
import { schema } from './schema';

const client = jwksClient({
  jwksUri:
    'https://cognito-idp.eu-west-1.amazonaws.com/eu-west-1_4MH59fRxt/.well-known/jwks.json',
});

export const server = new ApolloServer({
  schema,
  playground: true,
  introspection: true,
  context: async (data: any) => {
    return {};
    const req = data.req;
    const header = req.headers.authorization;

    if (!header) {
      throw new AuthenticationError('JWT is required');
    }

    const token = header.replace('Bearer ', '').trim();
    try {
      // There's some real weird type stuff going on here because of promisify and jwt overloads supporting callbacks and sync usage
      //@ts-expect-error stfu TS >:(
      const decoded: IJWT = await promisify(jwt.verify)(token, getKey, {
        algorithms: ['RS256'],
      });
      const user = await Person.findOrCreate(decoded.sub, { id: decoded.sub });
      return { user };
    } catch (error) {
      console.error(error);
      throw new AuthenticationError('Invalid JWT.');
    }
  },
});

function getKey(header: any, callback: CallableFunction) {
  client.getSigningKey(header.kid, (err: any, key: any) => {
    const signingKey = key.publicKey || key.rsaPublicKey;
    callback(null, signingKey);
  });
}

export interface IJWT {
  sub: string;
  iss: string;
  aud: string;
  token_use: 'access' | 'id';
  exp: number;
  iat: number;
}

export interface IContext {
  user: Person;
}
