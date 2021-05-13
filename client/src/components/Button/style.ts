import styled from 'styled';
import { Size, Color } from 'styled/types';

export const Text = styled.span < {
  color: Color,
  icon: boolean,
  isLoading: boolean,
  outline: boolean
} > `
    margin-left: ${({ icon, isLoading }): string => icon || isLoading ? '10px' : '0px'};

    ${({ theme, outline, color }) => {
    if (outline) {
      return `
        color: ${theme.colors[color]};
      `;
    }
    return `
      color: ${color === 'white' ? 'black' : '#fff'};
    `;
  }}

    font-size: 1.1rem;
    font-weight: 800;

`;

export const Container = styled.button<{ color: Color, icon: boolean, isLoading: boolean, outline: boolean, size: Size }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  border-radius: 2.5rem;
  background-size: 200% auto;
  font-weight: 900;
  border-width: 2px;
  border-style: solid;
  cursor: pointer;
  line-height: 19px;
  letter-spacing: 0;
  transition: all 0.3s cubic-bezier(.25,.8,.25,1);


  &:disabled{
    cursor: default;
    &:hover {
      ${Text}
    }
  }
  &:focus { outline: 0; }
  &:hover { background-position: right center; }


  ${({ theme, outline, color }): string => {
    if (outline) {
      return `
      background: transparent;
      border-color: ${theme.colors[color]};
      svg {
        fill: ${theme.colors[color]};
        stroke: ${theme.colors[color]};
      }

      &:disabled {
        border-color: ${theme.colors.gray};
        span {
          color: ${theme.colors.gray};
        }
        &:hover { color: ${theme.colors.gray}}
      }
    `;
    }
    else {
      return `
      background: ${theme.gradient[color]};
      border: none;

      svg {
        fill: ${color === 'white' ? 'black' : 'white'};
        stroke : ${color === 'white' ? 'black' : 'white'};
      }

      &:disabled {
        background: ${theme.colors.gray};
        border-color: ${theme.colors.gray};
        span {
          color: black;
        }
      }
    `;
    }
  }}

  svg {
    display: ${({ icon, isLoading }): string => icon || isLoading ? 'block' : 'none'};
    cursor: pointer;
  }



  ${({ size, theme }): string => {
    switch (size) {
      case 'small':
        return `
          padding: 4px 10px;
          font-size: ${theme.fontSize.tiny};
        `;
      case 'medium':
        return `
          padding: 6px 16px;
          font-size: ${theme.fontSize.small};
        `;
      case 'large':
        return `
          padding: 8px 22px;
          span {
            font-size: theme.fontSize.medium};
          }
        `;
    }
  }}
`;
