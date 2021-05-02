import styled from 'styled';

export const Container = styled.div`
  padding-top: 10rem;
`;

export const Title = styled.h2`
  display: flex;
  align-items: center;
  padding-bottom: 5rem;
  margin-bottom: 5rem;
  width: 100%;
  border-bottom: 1px solid ${({ theme }): string => theme.colors.gray};
  font-size: ${({ theme }) => theme.fontSize.huge};
  span {
    margin-left: 10px;
  }
`;

export const ContentContainer = styled.div`
  background-color: orange;
  min-height: 70vh;
`;
