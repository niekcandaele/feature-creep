import { FC, useEffect } from 'react';
import { Button, SubPage, TextField } from 'components';
import { useForm, SubmitHandler, Resolver } from 'react-hook-form';
import { gql, useMutation } from '@apollo/client';
import { Squad, CreateSquad as CreateSquadMutationType } from 'generated';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';

interface FormFields {
  squadName: string
}

const CREATE_SQUAD = gql`
mutation CREATE_SQUAD($squad:CreateSquad){
  createSquad(input: $squad) {
    name
    id
    }
  }
`;

const resolver: Resolver<FormFields> = async (values) => {
  return {
    values: !values.squadName ? {} : values,
    errors: !values.squadName
      ? {
        squadName: {
          type: 'required',
          message: 'A Squad name is required'
        },
      }
      : {}
  };
};

export const CreateSquad: FC = () => {
  const { control, handleSubmit, formState, reset } = useForm<FormFields>({ resolver, defaultValues: { squadName: '' } });
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [createSquad, { error, loading, data }] = useMutation<Squad, { squad: CreateSquadMutationType }>(CREATE_SQUAD);

  useEffect(() => {
    if (!loading && data) {
      enqueueSnackbar('Squad successfully created!', { variant: 'success' });
      navigate('/workspace');
    }
  }, [data]);

  const onSubmit: SubmitHandler<FormFields> = ({ squadName }) => {
    if (formState.isDirty) {
      createSquad({ variables: { squad: { name: squadName } } });
    }
  };

  if (error) {
    enqueueSnackbar('An unexpected error occured, the squad could not be created.', { variant: 'error' });
    reset({ squadName: '' });
  }

  return (
    <SubPage title="Create a new squad">
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* FUN TODO: Generate a custom placeholder */}
        <TextField control={control} labelText="Squad name" name="squadName" placeholder="Gryffindor" />
        <Button isLoading={loading} onClick={() => { /* dummy */ }} size="large" text="Create squad" type="submit" variant="default" />
      </form>
    </SubPage>
  );
};
