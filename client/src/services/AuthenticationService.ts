import { UserData } from 'context';
import { getClient } from 'apollo/client';
import { gql } from '@apollo/client';

const GET_USER_DATA = gql`
query GET_USER_DATA {
  person {
    firstName
    lastName
    email
  }
}
`;

class AuthenticationService {
  public async isAuthenticated(): Promise<UserData | null> {
    const { data, error } = await getClient().query({ query: GET_USER_DATA });
    // not authorized
    if (error) {
      return null;
    }
    return data;
  };
  public async signIn(): Promise<void> {
    return;
  };
  public async signOut(): Promise<boolean> {
    // True if successfull. // false if failed for some reason
    return true;
  };
};

export const authenticationService = new AuthenticationService();
