import { useState, FC, useEffect } from 'react';
import { Route } from 'react-router-dom';
import { NotAuthenticated } from 'pages';
import { useAuth, useUser } from 'hooks';
import { Loading } from 'components';
import { useLazyQuery, gql } from '@apollo/client';
import { Person } from 'generated';

interface AuthenticatedRouteProps {
  element: React.ReactElement | null;
  path: string;
}

/*
  Routes that can only be accessed when authorized and authenticated.
*/
export const AuthenticatedRoute: FC<AuthenticatedRouteProps> = ({ element, path }) => {
  const [isAuth, setAuth] = useState<boolean>(false);
  // Should probably handle error of uselazyquery as well.
  const [isLoading, setLoading] = useState<boolean>(true);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    // check if user is authenticated.
    if (isAuthenticated) {
      isAuthenticated().then((isAuth) => {
        if (isAuth) {
          setAuth(true);
          // request user data
        }
        setLoading(false);
      });
    }
  }, []);

  if (isLoading) { return <Loading />; }
  if (isAuth) { return <Route element={element} path={path} />; }

  return <Route element={<NotAuthenticated />} path={path} />;
};
