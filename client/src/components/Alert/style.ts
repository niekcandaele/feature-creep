import styled from 'styled';
import { AlertVariants } from '.';
import { motion } from 'framer-motion';
import { lighten, darken } from 'polished';

export const Container = styled(motion.div) <{ variant: AlertVariants }>`
  width: 100%;
  padding: 1rem 1.2rem;
  border-radius: 1rem;
  max-width: 600px;
  margin: 1.5rem auto 1.5rem auto;

  h2 {
    font-size: 1.3rem;
    display: flex;
    align-items: center;
    font-weight: 700;
    justify-content: flex-start;
  }
  p, li {
    font-size: 1.225rem;
  }
  ul {
    margin-left: 15px;
    list-style-type: disc;
    li {
      margin-top: .5rem;
      margin-bottom: .5rem;
    }
  }

  /* set background color equal to provided type */
  ${({ variant, theme }): string => {
    return `
        background-color: ${lighten('0.3', theme.colors[variant])};
        h2 {
          color: ${darken('0.2', theme.colors[variant])};
        }
        p, li {
          color: ${darken('0.2', theme.colors[variant])};
        }
        ::marker {
          color: ${darken('0.2', theme.colors[variant])};
        }
        `;
  }}
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: 40px 1fr;
`;

export const IconContainer = styled.div <{ variant: AlertVariants }>`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1.4rem;

  svg {
    fill: ${({ variant, theme }): string => theme.colors[variant]};
    }
`;

export const ButtonContainer = styled.div<{ show: boolean, variant: AlertVariants }>`
  display: ${({ show }): string => show ? 'flex' : 'none'};

  button {
    margin-right: 2rem;
    padding: 8px 0 2px 0;
    background-color: transparent;
    border-radius: .5rem;
    font-size: 1.3rem;
    border: none;
    cursor: pointer;
    font-weight: 700;
    color: ${({ theme, variant }): string => variant === 'success' ? darken('0.2', theme.colors.secondary) : darken('0.2', theme.colors[variant])};
  }
`;
