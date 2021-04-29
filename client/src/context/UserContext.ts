import { createContext, Dispatch } from 'react';

interface IUserContext {
  userData: Partial<UserData>;
  setUserData: Dispatch<Partial<UserData>>
}

export interface UserData {
  email: string;
  firstName: string;
  lastName: string;
  emailVerified: boolean;
  accessToken: string
  squads: string[];
}

export const UserContext = createContext<Partial<IUserContext>>({});
