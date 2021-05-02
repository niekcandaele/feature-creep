import { keyframes } from 'styled-components';

export const hovering = (up: number, down: number) => keyframes`
  0% {
    transform: TranslateY(-${down}px);
  }
  100% {
    transform: TranslateY(${up}px);
  }
`;
