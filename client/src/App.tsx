import { StrictMode, FC, useEffect, useState } from 'react';
import { Router } from './router';
import { DEFAULT } from 'styled/theme';
import { SnackbarProvider, SnackbarProviderProps } from 'notistack';
import { ApolloProvider } from '@apollo/client';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from 'styled/globalStyle';
import { getClient } from 'apollo/client';

const snackbarProps: Partial<SnackbarProviderProps> = {
  anchorOrigin: { horizontal: 'center', vertical: 'top' },
  autoHideDuration: 5000,
  hideIconVariant: true,
};

export const App: FC = () => {
  const [isLoading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // handle client connection
  });

  return (
    <StrictMode>
      <ThemeProvider theme={DEFAULT}>
        <ApolloProvider client={getClient()}>
          <SnackbarProvider {...snackbarProps}>
            <GlobalStyle />
            <Router />
          </SnackbarProvider>
        </ApolloProvider>
      </ThemeProvider>
    </StrictMode>
  );
};

export default App;
