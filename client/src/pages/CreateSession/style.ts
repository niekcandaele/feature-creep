import styled from 'styled';

export const Container = styled.div`
  h2 {
    margin-bottom: 1rem;
    margin-top: 5rem;
  }

`;
export const ButtonContainer = styled.div`
  border-top: 1px solid ${({ theme }) => theme.colors.gray};
  padding-top: 2rem;
  width: 100%;
  margin: 2rem 0;

  button {
    margin-left: auto;
  }
`;
