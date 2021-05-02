import { FC, useEffect } from 'react';
import { FaGhost as GhostIcon } from 'react-icons/fa';
import styled from 'styled';
import { hovering } from 'animations';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: ${({ theme }): string => theme.colors.quaternary};

  p {
    margin-top: 3rem;
    color: white;
    font-weight: 900;
    font-size: 3rem;
  }
`;

const Ghost = styled(GhostIcon)`
  animation: ${hovering(10, 10)} 1.2s alternate infinite;
  margin-bottom: 10px;
`;

export const Loading: FC = () => {
  useEffect(() => {
    document.querySelector('body')?.classList.add('loading');
    return () => {
      document.querySelector('body')?.classList.remove('loading');
    };
  }, []);

  return (
    <Container>
      <Ghost color="white" size={200} />
      <p>loading creepy tools.</p>
    </Container>
  );
};
