import { createContext } from 'react';

export interface IUserContext {
  userData: Partial<UserData>;
  setUserData: React.Dispatch<Partial<UserData>>
}

export interface UserData {
  email: string;
  firstName: string;
  lastName: string;
  emailVerified: boolean;
  accessToken: string
}

export const UserContext = createContext<Partial<IUserContext>>(undefined!);
