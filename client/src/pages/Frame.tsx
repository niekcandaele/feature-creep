import { FC, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled';
import { Outlet, useNavigate } from 'react-router-dom';
import { Header, Loading } from 'components';
import { useUser } from 'hooks';
import { useApolloClient, gql } from '@apollo/client';
import { Person } from 'generated';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  border-radius: 1.5rem;
  background-color:${({ theme }) => theme.colors.background};
`;
const ContentContainer = styled(motion.div)`
  background-color:${({ theme }) => theme.colors.background};
  width: 100%;
  opacity: 0;
  overflow-y: auto;
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
  const [loading, setLoading] = useState<boolean>(true);
  const client = useApolloClient();
  const navigate = useNavigate();

  useEffect(() => {
    if (setUserData) {
      setLoading(true);
      client.query<Person>({ query: GET_USER_DATA }).then(({ data: { firstName, lastName, email }, error }) => {
        // TODO: handle error
        if (!firstName || !lastName || !email) {
          navigate('/onboarding');
        } else {
          setUserData({ firstName, lastName, email: email });
        };
      });
    }
  }, []);

  if (loading) {
    return <Loading />;
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
