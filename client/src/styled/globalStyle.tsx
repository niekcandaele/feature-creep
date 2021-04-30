import { FC, Fragment, ReactNode } from 'react';
import { createGlobalStyle } from 'styled-components';
import { ThemeType } from './theme';

export const GlobalStyle = createGlobalStyle<{ theme: ThemeType }>`
  *::selection {
    background-color: ${({ theme }): string => theme.colors.primary};
    color: white;
  }
  :root {
    font-size: 62.5%; /* (62.5/100) * 16px = 10px */
    box-sizing: border-box;
  }

  html, body {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    scroll-behavior: smooth;
    font-family: 'Lato', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background: linear-gradient(180deg,#141628 0%, #292f51 100%);
  }
  body{
    padding: 0;
    margin: 0;
    transition: background-color 0.2s linear;
    overflow: hidden;
    padding-bottom: 100px;
  }
  #root {
    max-width: 1920px;
    width: calc(100% - 150px);
    overflow: hidden;
    height: calc(100vh - 150px);
    margin: 100px auto;
    background-color:${({ theme }): string => theme.colors.background};
    border-radius: 5rem;
  }
  a, p, div, li, h1, h2, h3, h4, h5, h6, header, footer {
    font-weight: 400; /* Default size */
    font-family: 'Lato', sans-serif;
    transition: background-color 0.2s linear;
    transition: box-shadow 0.125s linear;
    margin: 0;
    user-select: none;
    padding: 0;
    box-sizing: border-box;
    letter-spacing: 1px;
    line-height: 1.5;
    color: ${({ theme }) => theme.colors.gray};
  }
  h1,h2,h3,h4,h5,h6 {
    color:${({ theme }) => theme.colors.title};
    font-weight: 900;
  }
  h1 {
    font-size: 5rem;
  }
  h2 {
    font-size: 2.5rem;
  }
  h3 {
    font-size: 1.75rem;
  }
  h4 {
    font-size: 1.5rem;
  }
  p{
    font-size: 1.225rem;
  }
  strong {
    font-size: inherit;
    font-weight: inherit;
    color: ${({ theme }): string => theme.colors.gray}
  }
  a {
    font-weight: 900;
    text-decoration: none;
    font-size: 1.225rem;
    color: ${({ theme }): string => theme.colors.gray};
    span {
      font-size: 1.225rem;
    }
  }
  img {
    display: block;
  }
  ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
  }
  button {
    font-size: ${({ theme }): string => theme.fontSize.small};
    outline: 0;
    font-family: 'Lato', sans-serif;
    &:focus {
      outline:0;
    }
  }

  // ########################
  // ## Default Input layout
  // ########################
  input {
    background-color: transparent;
    outline: 0;
    display: block;
    border: 2px solid ${({ theme }): string => theme.colors.secondary};
    padding: 10px 12px;
    min-width: 200px;
    border-radius: .5rem;
    font-weight: 600;
    color: ${({ theme }): string => theme.colors.secondary};
    font-size: ${({ theme }) => theme.fontSize.small};
    &::placeholder {
      color: ${({ theme }): string => theme.colors.secondary};
      font-size: ${({ theme }) => theme.fontSize.small};
      font-weight: 600;
    }
  }

`;

export const StorybookGlobalStyle: FC<{ children: ReactNode }> = ({ children }) => (
  <Fragment>
    <GlobalStyle />
    { children}
  </Fragment>
);
