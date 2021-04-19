import baseStyled, { ThemedStyledInterface } from 'styled-components';

export const DEFAULT = {
  primary: '#146aff', // primary
  secondary: '#3a4763', // secondary
  gray: '#e7ebf0',
  title: '#1d254f',
  background: '#f6f7fa',
  error: '#FF4252',
  text: '#656686',
  gradient: 'linear-gradient(180deg, #2da3ff 0%, #146aff 100%)',
  shadow: 'rgb(0 0 0 / 10%) 0px 15px 45px 0px'
};

export type ThemeType = typeof DEFAULT;
export const styled = baseStyled as ThemedStyledInterface<ThemeType>;
