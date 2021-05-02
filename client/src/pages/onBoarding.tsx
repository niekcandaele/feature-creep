import { FC, useEffect } from 'react';
import styled from 'styled';
import { FaGhost as Ghost } from 'react-icons/fa';
import { hovering } from 'animations';
import { useForm, SubmitHandler, Resolver } from 'react-hook-form';
import { Button, TextField } from 'components';
import { Link } from 'react-router-dom';
import { gql, useMutation } from '@apollo/client';
import { lighten } from 'polished';
import { decode } from 'jsonwebtoken';

const ADD_USER_DETAILS = gql`
  mutation addUserDetails($firstName: String!, $lastName: String!, $email: String!) {
    editPerson(firstName: $firstName, lastName: $lastName, email: $email){
      firstname,
      lastname,
      email
    }
  }
`;

const Container = styled.div`
  background: ${({ theme }): string => lighten('0.03', theme.colors.background)};
  height: 100vh;
  position: relative;
 svg.link {
    position: absolute;
    left: 10%;
    top: 125px;
    animation: ${hovering(10, 10)} 2s alternate infinite ease-in-out;
    fill: white;
  }
`;

const ContentWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ContentContainer = styled.div`
box-shadow: ${({ theme }) => theme.shadow};
border-radius: 2rem;
width: 1200px;
height: 800px;
display: flex;
flex-direction:row;
align-items: center;
`;

const Image = styled.div`
  background:${({ theme }): string => theme.gradient.primary};
  width: 400px;
  height: 100%;
  border-top-left-radius: 3rem;
  border-bottom-left-radius: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  text-align: center;
  font-size: ${({ theme }) => theme.fontSize.huge};
  font-weight: 900;
`;
const Content = styled.div`
  background-color: ${({ theme }): string => theme.colors.background};
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8rem 0;
  border-top-right-radius: 3rem;
  border-bottom-right-radius: 3rem;

  form {
    width: 80%;
    margin: 0 auto;
  }

  h2 {
    font-size: 4rem;
    margin-bottom: 2.5rem;
  }
  p {
    color: white;
    width: 62%; // fix this
    margin: 0 auto;
    text-align: center;
    margin-bottom: 5rem;
  }
`;

type FormFields = {
  email: string;
  firstName: string;
  lastName: string;
}

const resolver: Resolver<FormFields> = async (values) => {
  return {
    values: !values.firstName ? {} : values,
    errors: !values.firstName
      ? {
        firstName: {
          type: 'required',
          message: 'Your firstname is required'
        },
        lastName: {
          type: 'required',
          message: 'This is required.'
        }
      }
      : {}
  };
};

export const OnBoarding: FC = () => {
  const { reset, control, handleSubmit, formState: { errors, isDirty }, setValue } = useForm<FormFields>({ resolver });
  const [addUserDetails, { data, loading }] = useMutation<FormFields>(ADD_USER_DETAILS);

  // block leaving this page.
  // const blocker = useBlocker(() => 'hello');

  useEffect(() => {
    const token = localStorage.getItem('idToken');
    if (token) {
      // validate token here
      const payload: any = decode(token);
      setValue('email', payload.email);
    }
  }, []);

  // TODO: extra check to make sure token is valid and fields are def empty.
  // We do not want the user having to change his own valid fields.
  const submit: SubmitHandler<FormFields> = async ({ firstName, lastName }) => {
    // only submit when fields are changed.
    if (isDirty) {
      // TODO: show success message
      const email = 'testemail@vanseveren.dev';
      const result = await addUserDetails({ variables: { firstName, lastName, email } });

      // Clear all fields
      reset();
    }
  };

  return (
    <Container>
      <Link to="/">
        <Ghost className="link" size={70} />
      </Link>
      <ContentWrapper>
        <ContentContainer>
          <Image>
            Thank <br /> you!
          </Image>
          <Content>
            <h2>Finish your profile!</h2>
            <p>We are happy you are choosing for Feature creep <Ghost color="white" size={15} />.
              We just need a few more details to get you up and running! 🏃</p>
            <form
              autoComplete="off"
              onSubmit={handleSubmit(submit)}
            >
              <TextField
                control={control}
                labelText="email"
                loading={loading}
                name="email"
                placeholder="preset@email.here"
                readOnly
              />
              <TextField
                control={control}
                error={errors.firstName}
                labelText="First name"
                loading={loading}
                name="firstName"
                placeholder=""
                required
              />
              <TextField
                control={control}
                error={errors.lastName}
                labelText="Last name"
                loading={loading}
                name="lastName"
                placeholder=""
                required
              />
              <Button
                isLoading={loading}
                onClick={() => { }}
                size="large"
                text="Submit profile"
                type="submit"
              />
            </form>
          </Content>
        </ContentContainer>
      </ContentWrapper>
    </Container>
  );
};
