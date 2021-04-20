import { FC, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';

const Container = styled.div`
  background-color:${({ theme }) => theme.p};
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  h1 {
    color: white;
    font-weight: 800;
  }
`;

export const Redirect: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  function setJWT() {
    const params = new URLSearchParams(location.hash);
    const idToken = params.get('#id_token');
    const accessToken = params.get('access_token');
    sessionStorage.setItem('jwt', JSON.stringify({ idToken, accessToken }));
  }

  function redirect() {
    const path = localStorage.getItem('redirect');
    if (path) {
      localStorage.removeItem('redirect');
      navigate(path);
      return;
    }
    // If a redirect link was not set, go back to the default page.
    navigate('/workspace');
  }

  // check local storage
  useEffect(() => {
    if (location.hash) { setJWT(); }
    redirect();
  }, []);

  return (
    <Container>
      <h1>Redirecting...</h1>
    </Container>
  );
};
