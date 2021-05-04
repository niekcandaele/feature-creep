import styled from 'styled';

export const Container = styled.div``;

export const Title = styled.h2`
  display: flex;
  align-items: center;
  padding-bottom: 2rem;
  margin-bottom: 2rem;
  width: 100%;
  font-weight: 600;
  border-bottom: 1px solid ${({ theme }): string => theme.colors.gray};
  font-size: ${({ theme }) => theme.fontSize.large};
  cursor: pointer;

  svg {
    cursor: pointer;
  }
  span {
    margin-left: 20px;
  }
`;

export const ContentContainer = styled.div`
  height: 60vh;
  overflow-y: auto;
`;
