import { css } from 'styled-components';
import { ThemeType } from './theme';

/* TODO:
  - maybe extract extra styling for search component
  - Create story for textfield
  - remove big create squad cards if user is part of a squad.
  - Add squad dropdown to header.
*/

export const SnackBarStyles = css<{ theme: ThemeType }>`
  // Snackbar snack colors for every type
   #notistack-snackbar {
    font-weight: 600;
    font-family: 'Lato', sans-serif
  }
  .mui-snackbar {
    color: white;
  }
 .MuiSnackbarContent-root {
    background-color: ${({ theme }): string => theme.colors.primary};
    color: white;
  }
  #notistack-snackbar {
    color: white;
    font-size: 1.5rem;
  }

  div[class^="SnackbarItem-variantWarning-"], div[class*="SnackbarItem-variantWarning-"] {
    background-color: ${({ theme }): string => theme.colors.error}!important;
    color: white;
  }
  div[class^="SnackbarItem-variantSuccess-"], div[class*="SnackbarItem-variantSuccess-"] {
    background-color: ${({ theme }): string => theme.colors.primary}!important;
    color: white;
  }
  div[class^="SnackbarItem-variantError-"], div[class*="SnackbarItem-variantError-"] {
    background-color: ${({ theme }): string => theme.colors.error}!important;
    color: white;
  }
  div[class^="SnackbarItem-variantInfo-"], div[class*="SnackbarItem-variantInfo-"] {
    background-color: ${({ theme }): string => theme.colors.tertiary}!important;
    color: white;
  }
`;
