import styled from 'styled';
import { hovering } from 'animations';
import { FaGhost as GhostIcon } from 'react-icons/fa';

export const Container = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 75px;
  padding: 15px 100px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid ${({ theme }): string => theme.colors.gray};

  a {
    color: white;
    font-weight: 800;
    font-size: ${({ theme }) => theme.fontSize.mediumLarge};
    span {
      margin-left: 1.5rem;
    }
  }
`;

export const ContentContainer = styled.div`
  display: flex;
  button{
    margin-right: 1.5rem;
  }
`;

export const Nav = styled.div`
  display: flex;
  align-items: center;
  margin: 0 30px;
  a {
    font-size: ${({ theme }) => theme.fontSize.small};
    color: black;
    &:hover {
      color: black;
    }
    img {
      margin-right: 5px;
      width: 24px;
      height: auto;
    }
  }
`;

export const User = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid ${({ theme }): string => theme.colors.gray};
  border-radius: 2rem;
  padding: 2px 8px 2px 2px;

  span {
    margin-left: 1rem;
    color: white;
    font-size: ${({ theme }): string => theme.fontSize.small};
    text-transform: capitalize;
  }
`;
export const List = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 120px;
`;

export const Ghost = styled(GhostIcon)`
  animation: ${hovering(5, 5)} 2s alternate infinite ease-in-out;
`;
