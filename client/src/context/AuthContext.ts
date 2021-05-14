import { setRedirect } from 'helpers';
import { createContext } from 'react';

interface IAuthContext {
  signIn: (redirect: string) => void;
  signOut: () => boolean;
  isAuthenticated: () => Promise<boolean>
  register: () => void;
}

export const AuthContext = createContext<IAuthContext>(authProvider());

export function authProvider(): IAuthContext {
  function signIn(redirect: string) {
    setRedirect(redirect);

    if (process.env.REACT_APP_SKIP_COGNITO === 'true') {
      window.location.href = redirect;
      return;
    }

    window.location.href = `https://feature-creep.auth.eu-west-1.amazoncognito.com/login?client_id=5mdqrbv4hchnh0v7dhh7isf2lb&response_type=token&scope=aws.cognito.signin.user.admin+email+openid+phone+profile&redirect_uri=${process.env.REACT_APP_HOSTNAME}/redirect`;
    return;
  }

  function signOut(): boolean {
    // contains access token.
    localStorage.removeItem('accessToken');
    localStorage.removeItem('idToken');
    return true;
  }

  function register() {
    // redirect to register page
    return;
  }
  async function isAuthenticated(): Promise<boolean> {
    if (process.env.REACT_APP_SKIP_COGNITO === 'true') {
      return true;
    }

    // Check if user has a token.
    const token = localStorage.getItem('accessToken');
    if (!token) { return false; }

    //    const { data, error } = await getClient().query({ query: GET_USER_DATA });
    //
    //   if (!data || error) {
    //     return false;
    //   }
    return true;
  }
  return { signIn, signOut, isAuthenticated, register };
};
