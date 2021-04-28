import { FC, useContext, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import { UserContext } from 'context';

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
  const { setUserData } = useContext(UserContext);

  // TODO: move this to jwt helper or something like that.
  function setJWT() {
    const params = new URLSearchParams(location.hash);
    const idToken = params.get('#id_token');
    const accessToken = params.get('access_token');
    // no jwt in redirect passed.
    if (!idToken || !accessToken) {
      console.log('dis fires');
      return;
    };
    // save access token in local storage
    localStorage.setItem('token', accessToken);
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
    setJWT();
    redirect();
  }, []);

  return (
    <Container>
      <h1>Redirecting...</h1>
    </Container>
  );
};
