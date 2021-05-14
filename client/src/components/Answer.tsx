import styled from 'styled';

export const Answer = styled.div<{ answer: undefined | 0 | 1 | 2 }>`

  width: 100%;
  height: 100px;
  border-radius: 50%;

  ${({ answer, theme }) => {
    switch (answer) {
      case 0:
        return `background-color: ${theme.colors.error};`;
      case 1:
        return `background-color: ${theme.colors.warning};`;
      case 2:
        return `background-color: ${theme.colors.success};`;
      default:
        return `background-color: ${theme.colors.gray};`;
    }
  }}
`;
