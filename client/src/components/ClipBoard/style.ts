import styled from 'styled';

export const Container = styled.div<{ maxWidth: number, copied: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  input {
    display: block;
    max-width: ${({ maxWidth }) => maxWidth}px;
    min-width: ${({ maxWidth }) => maxWidth}px;
    padding: 8px 30px 8px 8px;
    border: 2px solid ${({ copied, theme }): string => copied ? theme.colors.primary : theme.colors.gray};
    color: ${({ copied, theme }): string => copied ? theme.colors.primary : theme.colors.white};
    cursor: default;
    &:hover {
      cursor: default;
    }
    &:focus {
      border-color: ${({ copied, theme }): string => copied ? theme.colors.primary : theme.colors.gray};
    }
  }
`;

export const IconContainer = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 10px;
  svg {
    fill: ${({ theme }): string => theme.colors.primary};
    stroke: ${({ theme }): string => theme.colors.primary};
    cursor: pointer;
  }
`;
