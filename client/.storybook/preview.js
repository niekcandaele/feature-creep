import { ThemeProvider } from 'styled-components';
import { DEFAULT } from '../src/styled/theme';
import { GlobalStyle } from '../src/styled/globalStyle';
import { MemoryRouter } from 'react-router-dom';

export const decorators = [
  Story => (
    <ThemeProvider theme={DEFAULT}>
      <MemoryRouter initialEntries={['/']}>
        <GlobalStyle />
        <Story />
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
}