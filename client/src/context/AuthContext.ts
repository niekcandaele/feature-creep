import { createContext } from 'react';
import { getClient } from 'apollo/client';
import { gql } from '@apollo/client';
import { setRedirect } from 'helpers/setRedirect';

interface IAuthContext {
  signIn: () => void;
  signOut: () => boolean;
  isAuthenticated: () => Promise<boolean>
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

export const AuthContext = createContext<Partial<IAuthContext>>({});

export function authProvider(): IAuthContext {
  function signIn(path: string = '/workspace') {
    setRedirect(path);
    window.location.href = `https://feature-creep.auth.eu-west-1.amazoncognito.com/login?client_id=5mdqrbv4hchnh0v7dhh7isf2lb&response_type=token&scope=aws.cognito.signin.user.admin+email+openid+phone+profile&redirect_uri=${process.env.REACT_APP_HOSTNAME}/redirect`;
    return;
  }

  function signOut(): boolean {
    // contains access token.
    localStorage.removeItem('token');
    return true;
  }
  async function isAuthenticated(): Promise<boolean> {
    // Check if user has a token.
    const token = localStorage.getItem('token');
    if (!token) {
      return false;
    }

    const { data, error } = await getClient().query({ query: GET_USER_DATA });

    if (!data || error) {
      return false;
    }
    return true;
  }

  return { signIn, signOut, isAuthenticated };
};
