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
  const [ping, { loading, called, error }] = useLazyQuery(PING);

  useEffect(() => {
    // check if user is authenticated,
    // - check if both tokens are set
    // check if he can make a request that returns a 200 status OK
    ping();
  }, []);

  if (!called || loading) { return <Loading />; }
  if (!error) { return <Route element={element} path={path} />; }
  return <Route element={<NotAuthenticated />} path={path} />;
};
