import { FC, useEffect } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled';
import { Outlet } from 'react-router-dom';
import { Header } from 'components';
import { useUser } from 'hooks';
import { useApolloClient, gql } from '@apollo/client';

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
  const client = useApolloClient();

  useEffect(() => {
    if (setUserData) {
      client.query({ query: GET_USER_DATA }).then(({ data, error }) => {
        console.log(error);
        //setUserData({ });
      });
    }
  }, []);

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
