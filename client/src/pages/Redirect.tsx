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

function setJWT(hash: string) {
  const params = new URLSearchParams(hash);
  const idToken = params.get('#id_token');
  const accessToken = params.get('access_token');
  // no jwt in redirect passed.
  if (idToken && accessToken) {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('idToken', idToken);
  };
  // show error message here.
}

export const Redirect: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

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
    setJWT(location.hash);
    redirect();
  }, []);

  return (
    <Container>
      <h1>Redirecting...</h1>
    </Container>
  );
};
