import { StrictMode, FC, useEffect, useState, useMemo } from 'react';
import { Router } from './router';
import { DEFAULT } from 'styled/theme';
import { SnackbarProvider, SnackbarProviderProps } from 'notistack';
import { ApolloProvider } from '@apollo/client';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from 'styled/globalStyle';
import { getClient } from 'apollo/client';
import { UserContext } from 'context';
import { authenticationService } from 'services';

const snackbarProps: Partial<SnackbarProviderProps> = {
  anchorOrigin: { horizontal: 'center', vertical: 'top' },
  autoHideDuration: 5000,
  hideIconVariant: true,
};

export const App: FC = () => {
  const [isLoading, setLoading] = useState<boolean>(true);

  const [userData, setUserData] = useState({});
  const providerUserData = useMemo(() => ({ userData, setUserData }), [userData, setUserData]);

  useEffect(() => {
    authenticationService.isAuthenticated().then((userData) => {
      if (userData) {
        setUserData(userData);
      }
      setLoading(false);
    });
  }, []);

  if (isLoading) {
    return (
      <StrictMode>
        <ThemeProvider theme={DEFAULT}>
          <div>loading...</div>
        </ThemeProvider>
      </StrictMode>
    );
  }

  return (
    <StrictMode>
      <ThemeProvider theme={DEFAULT}>
        <ApolloProvider client={getClient()}>
          <UserContext.Provider value={providerUserData}>
            <SnackbarProvider {...snackbarProps}>
              <GlobalStyle />
              <Router />
            </SnackbarProvider>
          </UserContext.Provider>
        </ApolloProvider>
      </ThemeProvider>
    </StrictMode>
  );
};
