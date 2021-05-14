import { FC, useEffect, useMemo } from 'react';
import { FaGhost as Ghost } from 'react-icons/fa';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Button, TextField } from 'components';
import { Link, useNavigate } from 'react-router-dom';
import { gql, useQuery, useMutation } from '@apollo/client';
import { decode } from 'jsonwebtoken';
import { Container, Content, ContentContainer, ContentWrapper, Image } from './style';
import { Person, EditPersonType } from 'generated';
import { useUser } from 'hooks';
import * as yup from 'yup';
import { getRedirect } from 'helpers';
import { useValidationSchema } from 'hooks/useValidationResolver';
import { GET_PERSON } from 'queries';

const ADD_USER_DETAILS = gql`
  mutation addUserDetails($person:EditPersonType!) {
    editPerson(person: $person){
      email
      firstName
      lastName
    }
  }
`;

type FormFields = {
  email: string;
  firstName: string;
  lastName: string;
}

export const OnBoarding: FC = () => {
  const validationSchema = useMemo(
    () =>
      yup.object({
        firstName: yup.string().required('Firstname is required.'),
        lastName: yup.string().required('Lastname is required.')
      }),
    []
  );

  const { control, handleSubmit, formState: { errors, isDirty }, setValue } = useForm<FormFields>({ resolver: useValidationSchema(validationSchema) });

  const { data } = useQuery<{ person: Person }>(GET_PERSON);

  const [addUserDetails, { loading, error }] = useMutation<Person, { person: EditPersonType }>(ADD_USER_DETAILS);
  const { setUserData } = useUser();
  const navigate = useNavigate();

  // TODO: block leaving this page (could break some stuff)
  // const blocker = useBlocker(() => 'hello');

  useEffect(() => {
    document.querySelector('body')?.classList.add('dark');
    const token = localStorage.getItem('idToken');
    if (token) {
      // validate token here
      const payload: any = decode(token);
      setValue('email', payload.email);
    }

    return () => { document.querySelector('body')?.classList.remove('dark'); };
  }, []);

  // This catches a user manually browsing to this page.
  useEffect(() => {
    if (data && data.person && data.person.firstName) {
      // check if firstname and lastname are set
      if (data.person.firstName && data.person.lastName) {
        navigate('/workspace');
      }
    }
  }, [data]);

  const submit: SubmitHandler<FormFields> = async ({ firstName, lastName, email }) => {
    if (isDirty) {
      const { errors } = await addUserDetails({ variables: { person: { firstName, lastName, email } } });

      if (errors) {
        /* Handle */
      }

      // generate random number between 1 and 5 (currently only 5 avatars);
      setUserData({ firstName, lastName, email, avatar: `images/avatars/avatar-${Math.floor((Math.random() * 4) + 1)}` });
      navigate(getRedirect());
    }
  };

  if (error) {
    return <div>{error}</div>;
  }

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
