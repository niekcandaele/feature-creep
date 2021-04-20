import { createContext } from 'react';

export interface IUserContext {
  userData: Partial<IUserData>;
  setUserData: React.Dispatch<IUserData>
}

export interface IUserData {
  email: string;
  discordId: string;
  steamId: string;
  firstName: string;
  lastName: string;
}

export const UserContext = createContext<Partial<IUserContext>>(undefined!);
