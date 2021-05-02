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
  }
  body{
    background: linear-gradient(180deg,#141628 0%, #292f51 100%);
    padding: 0;
    margin: 0;
    overflow: hidden;
    padding-bottom: 100px;

    &.loading {
      background: ${({ theme }): string => theme.colors.quaternary};
    }
  }
  #root {
    width: 100%;
    height: 100%;
    overflow: hidden;
    background-color:${({ theme }): string => theme.colors.background};
  }

  form {
    width: 100%;
  }

  a, p, div, li, h1, h2, h3, h4, h5, h6, header, footer, form, input {
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
    font-size: ${({ theme }) => theme.fontSize.medium}
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
    border: 2px solid ${({ theme }): string => theme.colors.gray};
    padding: 10px 12px;
    min-width: 200px;
    width: 100%;
    border-radius: .5rem;
    font-weight: 600;
    color: black;
    font-size: ${({ theme }) => theme.fontSize.small};
    margin: 15px 0;
    &::placeholder {
      color: ${({ theme }): string => theme.colors.secondary};
      font-size: ${({ theme }) => theme.fontSize.small};
      font-weight: 600;
    }
  }

  // Remove default webkit search field styling
  input[type="search"]::-webkit-search-decoration,
  input[type="search"]::-webkit-search-cancel-button,
  input[type="search"]::-webkit-search-results-button,
  input[type="search"]::-webkit-search-results-decoration {
    -webkit-appearance:none;
  }

`;

export const StorybookGlobalStyle: FC<{ children: ReactNode }> = ({ children }) => (
  <Fragment>
    <GlobalStyle />
    { children}
  </Fragment>
);
