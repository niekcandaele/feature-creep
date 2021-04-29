import baseStyled, { ThemedStyledInterface } from 'styled-components';

export const theme = {
  colors: {
    primary: '#146aff', // primary
    secondary: '#5e5c65', // secondary
    gray: '#e7ebf0',
    title: '#1d254f',
    background: '#151317',
    error: '#FF4252',
    text: '#656686',
  },
  gradient: {
    primary: 'linear-gradient(180deg, #2da3ff 0%, #146aff 100%)'
  },
  shadow: 'rgb(0 0 0 / 10%) 0px 15px 45px 0px',
  fontSize: {
    tiny: '.8rem',
    small: '1.225rem',
    medium: '1.825rem',
    large: '2.325rem',
    huge: '4rem'
  }
};

export type ThemeType = typeof theme;
export const styled = baseStyled as ThemedStyledInterface<ThemeType>;
