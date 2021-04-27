import { ApolloClient, ApolloLink, InMemoryCache, HttpLink } from '@apollo/client';
import { RetryLink } from '@apollo/client/link/retry';
import { WebSocketLink } from '@apollo/client/link/ws';
import { setContext } from '@apollo/client/link/context';

let client: ApolloClient<any>;

export function getClient(): ApolloClient<any> {
  try {
    if (client) {
      return client;
    }
    else {
      const wsUri = process.env.REACT_APP_APOLLO_WS_URI;
      if (!wsUri) {
        throw new Error('Websocket uri was not found');
      }

      const authLink = setContext((_, { headers }) => {
        const token = localStorage.getItem('token');
        return {
          headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : ''
          }
        };
      });

      const link = ApolloLink.from([
        new HttpLink({ uri: process.env.REACT_APP_APOLLO_HTTP_URI, credentials: 'same-origin' }),
        new RetryLink(),
        new WebSocketLink({ uri: wsUri, options: { reconnect: true } }),
        authLink
      ]);

      client = new ApolloClient({ link, cache: new InMemoryCache() });
      return client;
    }
  } catch (e) {
    throw new Error('Could not setup connection with client');
  }
}
