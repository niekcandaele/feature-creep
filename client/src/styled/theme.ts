import { ListItemSecondaryAction } from '@material-ui/core';
import baseStyled, { ThemedStyledInterface } from 'styled-components';

export const theme = {
  colors: {
    primary: '#a266df', // primary
    secondary: '#2ea26f',
    tertiary: '#146aff',
    quaternary: '#F75D75',
    gray: '#3c3a43',
    white: '#ffffff',
    title: '#ffffff',
    background: '#151317',

    info: '#146aff',
    success: '#2ea26f',
    error: '#FF4252',
    warning: '#f57c00'
  },
  gradient: {
    primary: 'linear-gradient(180deg, #cFa1de 0%, #a266df 100%)',
    secondary: 'linear-gradient(180deg, #78cca7 0%, #2ea26f 100%)',
    tertiary: 'linear-gradient(180deg, #2da3ff 0%, #146aff 100%)',
    quaternary: 'linear-gradient(180deg, #ea9ca9 0%, #F75D75 100%)',
    white: 'linear-gradient(180deg, #fff 0%, #fff 100%)',
    gray: 'linear-gradient(180deg, #4f4f4f 0%, #3c3a43 100%)'
  },
  shadow: 'rgb(0 0 0 / 10%) 0px 15px 45px 0px',
  fontSize: {
    tiny: '1rem',
    small: '1.3rem',
    medium: '1.825rem',
    mediumLarge: '2.825rem',
    large: '4.25rem',
    huge: '6rem'
  }
};

export type ThemeType = typeof theme;
export const styled = baseStyled as ThemedStyledInterface<ThemeType>;
