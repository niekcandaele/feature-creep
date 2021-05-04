import { ThemeProvider } from 'styled-components';
import { theme } from '../src/styled/theme';
import { GlobalStyle } from '../src/styled/globalStyle';
import { MemoryRouter } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import { getSnackProps } from '../src/helpers';
import { viewports as customViewports } from './viewports';

export const decorators = [
  Story => (
    <ThemeProvider theme={theme}>
      <MemoryRouter initialEntries={['/']}>
        <SnackbarProvider {...getSnackProps()}>
          <GlobalStyle />
          <Story />
        </SnackbarProvider>
      </MemoryRouter>
    </ThemeProvider>
  )
]

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  viewport: {
    viewports: customViewports
  }
}