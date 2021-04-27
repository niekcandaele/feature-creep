import { useState, FC, useEffect } from 'react';
import { authenticationService } from 'services';
import { Route } from 'react-router-dom';
import { NotAuthenticated } from 'pages';

interface AuthenticatedRouteProps {
  element: React.ReactElement | null;
  path: string;
}

/*
  Routes that can only be accessed when authorized and authenticated.
*/
export const AuthenticatedRoute: FC<AuthenticatedRouteProps> = ({ element, path }) => {
  const [isAuthenticated, setAuthenticated] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    authenticationService.isAuthenticated().then((isValid) => {
      if (isValid) {
        setAuthenticated(true);
        setLoading(false);
      }
    });
    // check if user is authenticated.
  }, []);

  if (isLoading) {
    return <div>loading...</div>;
  }

  if (isAuthenticated) {
    return <Route element={element} path={path} />;
  }
  return <Route element={<NotAuthenticated />} path={path} />;
};
