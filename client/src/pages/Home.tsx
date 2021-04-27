import { FC } from 'react';
import { Button } from 'components';
import { setRedirect } from 'helpers';

export const Home: FC = () => {
  function signIn() {
    setRedirect('/workspace');
    // show message here
    window.location.href = `https://feature-creep.auth.eu-west-1.amazoncognito.com/login?client_id=5mdqrbv4hchnh0v7dhh7isf2lb&response_type=token&scope=aws.cognito.signin.user.admin+email+openid+phone+profile&redirect_uri=${process.env.REACT_APP_HOSTNAME}/redirect`;
  }

  return (
    <div>
      <Button label="Sign in" onClick={signIn} />
    </div>
  );
};
