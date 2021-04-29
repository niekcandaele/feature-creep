import { StrictMode, FC, useEffect, useState, useMemo } from 'react';
import { Router } from './router';
import { theme } from 'styled/theme';
import { SnackbarProvider, SnackbarProviderProps } from 'notistack';
import { ApolloProvider } from '@apollo/client';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from 'styled/globalStyle';
import { getClient } from 'apollo/client';
import { AuthContext, authProvider } from 'context/AuthContext';
import { UserContext } from 'context/UserContext';

const snackbarProps: Partial<SnackbarProviderProps> = {
  anchorOrigin: { horizontal: 'center', vertical: 'top' },
  autoHideDuration: 5000,
  hideIconVariant: true,
};

export const App: FC = () => {
  const [isLoading, setLoading] = useState<boolean>(true);

  const [userData, setUserData] = useState({});
  const userDataProvider = useMemo(() => ({ userData, setUserData }), [userData, setUserData]);

  useEffect(() => {
    // do stuff here
    setLoading(false);
  }, []);

  if (isLoading) {
    return (
      <StrictMode>
        <ThemeProvider theme={theme}>
          <div>App loading.</div>
        </ThemeProvider>
      </StrictMode>
    );
  }

  return (
    <StrictMode>
      <ThemeProvider theme={theme}>
        <ApolloProvider client={getClient()}>
          <UserContext.Provider value={userDataProvider}>
            <AuthContext.Provider value={authProvider()}>
              <SnackbarProvider {...snackbarProps}>
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
