import { gql, useLazyQuery } from '@apollo/client';
import { Loading } from 'components';
import { useAuth } from 'hooks';
import { NotAuthenticated } from 'pages';
import { FC, useEffect } from 'react';
import { Route } from 'react-router-dom';

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
  const { isAuthenticated } = useAuth();
  useEffect(() => {
    /* check if user is authenticated,
      - check if he can make a request that returns a 200 status OK.
      - We don't have to check the access tokens, because the token is used to make a request
    */

    ping();
  }, []);

  if (!called || loading) { return <Loading />; }
  // check if idToken with extra information is set, we possibly have to extract this if it is the first time the user is signing in.
  if (!error && isAuthenticated()) { return <Route element={element} path={path} />; }
  return <Route element={<NotAuthenticated />} path={path} />;
};
