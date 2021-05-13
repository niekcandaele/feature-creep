import { css } from 'styled-components';
import { ThemeType } from './theme';

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
  // info
  div[class^="SnackbarItem-variantInfo-"], div[class*="SnackbarItem-variantInfo-"] {
    background-color: ${({ theme }): string => theme.colors.info}!important;
    color: white;
  }
  // success
  div[class^="SnackbarItem-variantSuccess-"], div[class*="SnackbarItem-variantSuccess-"] {
    background-color: ${({ theme }): string => theme.colors.primary}!important;
    color: white;
  }
  // warning
  div[class^="SnackbarItem-variantWarning-"], div[class*="SnackbarItem-variantWarning-"] {
    background-color: ${({ theme }): string => theme.colors.warning}!important;
    color: white;
  }
  // error
  div[class^="SnackbarItem-variantError-"], div[class*="SnackbarItem-variantError-"] {
    background-color: ${({ theme }): string => theme.colors.error}!important;
    color: white;
  }


`;
