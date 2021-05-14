import { FC, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { setRedirect } from 'helpers';
//import { routingService } from 'services';

export const NotAuthenticated: FC = () => {
  const location = useLocation();
  useEffect(() => {
    setTimeout(() => {
      setRedirect(location.pathname);
      //routingService.navigateExternal('/naar-redirect');
    }, 2000);
  }, []);

  return (
    <div>You are not authenticated, you will be redirected to the signin page.</div>
  );
};
