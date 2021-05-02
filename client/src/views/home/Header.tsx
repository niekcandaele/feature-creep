import { FC } from 'react';
import styled from 'styled';
import { Button } from 'components';
import { useAuth } from 'hooks';
import { Link } from 'react-router-dom';
import {
  AiOutlineLogin as SignInIcon,
  AiFillHeart as RegisterIcon
} from 'react-icons/ai';
import { FaGhost as GhostIcon } from 'react-icons/fa';
import { hovering } from 'animations';

const Container = styled.header`
  z-index: 10;
  width: 100%;
  height: 7.5rem;
  padding: 15px 100px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid ${({ theme }): string => theme.colors.gray};
`;

const Brand = styled.div`
  display: flex;
  align-items: center;
  border-right: 1px solid ${({ theme }) => theme.colors.gray};
  padding-right: 2.5rem;
  a, h2 {
    color: white;
    font-weight: 700;
    font-size: ${({ theme }) => theme.fontSize.mediumLarge};
  }
  h2 {
    margin-left: 1rem;
  }
`;

const Nav = styled.nav`
  a {
    margin-left: 2.5rem;
    margin-right: 2.5rem;
    transition: color .2s ease-in-out;

    &:hover {
      color: white;
    }
  }
`;

const Left = styled.div`
  display: flex;
  align-items: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  button {
    margin-left: 5px;
    margin-right: 5px;
  }
`;

const AnimatedGhostIcon = styled(GhostIcon)`
  animation: ${hovering(5, 2)} 2s alternate infinite ;
`;

export const Header: FC = () => {
  const { signIn, register } = useAuth();

  return (
    <Container>
      <Left>
        <Brand>
          <AnimatedGhostIcon color="white" size={24} />
          <Link to="/"><h2>Feature creep</h2></Link>
        </Brand>
        <Nav>
          <Link to="/" >Discover</Link>
          <Link to="/" >How it works</Link>
        </Nav>
      </Left>
      <ButtonContainer>
        <Button icon={<SignInIcon size={18} />} onClick={() => { signIn('/workspace'); }} text="Sign in" />
        <Button icon={<RegisterIcon size={18} />} onClick={register} text="Register" white />
      </ButtonContainer>
    </Container>
  );
};
