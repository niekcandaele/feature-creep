import { useState, FC, useEffect } from 'react';
import { Route } from 'react-router-dom';
import { NotAuthenticated } from 'pages';
import { useAuth, useUser } from 'hooks';
import { Error, Loading } from 'components';
import { useLazyQuery, gql } from '@apollo/client';
import { Person } from 'generated';

interface AuthenticatedRouteProps {
  element: React.ReactElement | null;
  path: string;
}

/*
  Routes that can only be accessed when authorized and authenticated.
*/

const PING = gql`
  query ping {
    ping
  }
`;

export const AuthenticatedRoute: FC<AuthenticatedRouteProps> = ({ element, path }) => {
  const [ping, { loading, called, error, data }] = useLazyQuery(PING);

  useEffect(() => {
    /* check if user is authenticated,
      - check if he can make a request that returns a 200 status OK.
      - We don't have to check the access tokens, because the token is used to make a request
    */

    ping();
  }, []);

  if (!called || loading) { return <Loading />; }
  // check if idToken with extra information is set, we possibly have to extract this if it is the first time the user is signing in.
  if (!error && localStorage.getItem('idToken')) { return <Route element={element} path={path} />; }
  return <Route element={<NotAuthenticated />} path={path} />;
};
