import { FC, useEffect } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Header, Loading } from 'components';
import { useUser } from 'hooks';
import { gql, useQuery } from '@apollo/client';
import { Person } from 'generated';
import { setRedirect } from 'helpers';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  border-radius: 1.5rem;
  background-color:${({ theme }) => theme.colors.background};
`;
const ContentContainer = styled(motion.div)`
  padding-top: 2rem;
  background-color:${({ theme }) => theme.colors.background};
  width: 100%;
  height: calc(100vh - 100px);
  opacity: 0;
  overflow-y: auto;
  margin-bottom: 75px;
  border-bottom: 1px solid ${({ theme }): string => theme.colors.gray};
`;
const Page = styled.div`
  padding: 30px 80px;
`;

const GET_USER_DATA = gql`
  query GET_USER_DATA {
    person {
      firstName
      lastName
      email
    }
  }
`;

export const Frame: FC = () => {
  // get user data
  const { setUserData } = useUser();
  const { loading, data } = useQuery<{ person: Person }>(GET_USER_DATA, { fetchPolicy: 'no-cache' });
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (data) {
      const { firstName, lastName, email } = data.person;
      if (!firstName || !lastName || !email) {
        // if these fields are not filled in we should remember the page where we wanted to go to.
        setRedirect(location.pathname);
        navigate('/onboarding');
      } else {
        setUserData({ firstName, lastName, email: email });
      };
    }
  }, [loading]);

  if (loading || !data || !data.person || !data.person.firstName) {
    return (<Loading />);
  }

  return (
    <Container>
      <Header />
      <ContentContainer
        animate={{ opacity: 1 }}
        transition={{ delay: .3, duration: .5 }}
      >
        <Page>
          <Outlet />
        </Page>
      </ContentContainer>
    </Container>
  );
};
