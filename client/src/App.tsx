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
import styled from 'styled';

const Cursor = styled.div<{ x: number; y: number }>`
  left: 0;
  top: 0;
  width: 32px;
  height: 32px;
  border-radius: 16px;
  background-color: white;
  transform: ${({ x, y }) => `translate3d(${x}px, ${y}px, 0)`};
`;

const snackbarProps: Partial<SnackbarProviderProps> = {
  anchorOrigin: { horizontal: 'center', vertical: 'top' },
  autoHideDuration: 5000,
  hideIconVariant: true,
};

interface CursorProps {
  x: number;
  y: number;
}

export const App: FC = () => {
  const [cursorXY, setCursorXY] = useState<CursorProps>({ x: -100, y: -100 });
  const [isLoading, setLoading] = useState<boolean>(true);

  const [userData, setUserData] = useState({});
  const userDataProvider = useMemo(() => ({ userData, setUserData }), [userData, setUserData]);

  const moveCursor = (e: any) => {
    const x = e.clientX - 16;
    const y = e.clientY - 16;
    setCursorXY({ x, y });
  };

  useEffect(() => {
    window.addEventListener('mousemove', moveCursor);
    setLoading(false);

    // clean up
    return () => {
      window.removeEventListener('mousemove', moveCursor);
    };
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
                <Cursor {...cursorXY} />
                <Router />
              </SnackbarProvider>
            </AuthContext.Provider>
          </UserContext.Provider>
        </ApolloProvider>
      </ThemeProvider>
    </StrictMode>
  );
};
