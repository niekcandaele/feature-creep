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

const GET_USER_DATA = gql`
  query GET_USER_DATA {
    person {
      firstName
      lastName
      email
    }
  }
`;

/*
  Routes that can only be accessed when authorized and authenticated.
*/
export const AuthenticatedRoute: FC<AuthenticatedRouteProps> = ({ element, path }) => {
  const [isAuth, setAuth] = useState<boolean>(false);
  // Should probably handle error of uselazyquery as well.
  const [getUserData, { loading, data }] = useLazyQuery<Person>(GET_USER_DATA);
  const [isLoading, setLoading] = useState<boolean>(true);
  const { isAuthenticated } = useAuth();
  const { setUserData, userData } = useUser();

  useEffect(() => {
    // check if user is authenticated.
    if (isAuthenticated) {
      isAuthenticated().then((isAuth) => {
        if (isAuth) {
          setAuth(true);
          getUserData();
          // request user data
        }
        setLoading(false);
      });
    }
  }, []);

  useEffect(() => {
    setAuth(true);
    setLoading(false);
  }, []);

  if (isLoading && loading) { return <Loading />; }
  if (isAuth) {
    // @ts-ignore
    setUserData({ ...userData, ...data });
    return <Route element={element} path={path} />;
  }

  return <Route element={<NotAuthenticated />} path={path} />;
};
