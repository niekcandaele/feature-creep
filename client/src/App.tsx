import { StrictMode, FC, useState, useMemo } from 'react';
import { Router } from './router';
import { theme } from 'styled/theme';
import { SnackbarProvider } from 'notistack';
import { ApolloProvider } from '@apollo/client';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from 'styled/globalStyle';
import { getClient } from 'apollo/client';
import { AuthContext, authProvider } from 'context/AuthContext';
import { UserContext, UserData } from 'context/UserContext';
import { getSnackProps } from 'helpers/getSnackProps';

// Custom scrollbar
import 'simplebar/dist/simplebar.min.css';

export const App: FC = () => {
  // const [isLoading, setLoading] = useState<boolean>(true);
  const [userData, setUserData] = useState<Partial<UserData>>({});
  const userDataProvider = useMemo(() => ({ userData, setUserData }), [userData, setUserData]);

  /*
  if (isLoading) {
    return (
      <StrictMode>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <Loading />
        </ThemeProvider>
      </StrictMode>
    );
  }
  */

  return (
    <StrictMode>
      <ThemeProvider theme={theme}>
        <ApolloProvider client={getClient()}>
          <UserContext.Provider value={userDataProvider}>
            <AuthContext.Provider value={authProvider()}>
              <SnackbarProvider {...getSnackProps()}>
                <GlobalStyle />
                <Router />
              </SnackbarProvider>
            </AuthContext.Provider>
          </UserContext.Provider>
        </ApolloProvider>
      </ThemeProvider>
    </StrictMode>
  );
};
