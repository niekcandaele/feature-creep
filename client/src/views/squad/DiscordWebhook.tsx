/* TODO: Rewrite this to more abstract form so other services can use this aswell. */

import { Alert, TextField } from 'components';
import { FC, useEffect, useMemo } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import styled from 'styled-components';
import { RiDiscordFill as Discord } from 'react-icons/ri';
import { useMutation, gql, useQuery } from '@apollo/client';
import { useSnackbar } from 'notistack';
import { Squad } from 'generated';
import { useValidationSchema } from 'hooks';

const Container = styled.div`
  width: 100%;
`;

type FormFields = {
  token: string;
}

const SET_DISCORD_TOKEN = gql`
  mutation SET_DISCORD_TOKEN {
    setSquadOpen(id: { squadId: "123"}){
      id
    }
  }
`;

const GET_EXISTING_TOKEN = gql`
  query GET_EXISTING_TOKEN($id: String!){
    squad(id: $id){
      token
    }
  }
`;

interface DiscordWebhookProps {
  squadId: string;
}
export const DiscordWebhook: FC<DiscordWebhookProps> = ({ squadId }) => {
  const validationSchema = useMemo(
    () => yup.object({
      token: yup.string()
    }), []
  );

  const { handleSubmit, control, formState, setValue } = useForm<FormFields>({
    resolver: useValidationSchema(validationSchema),
    defaultValues: { token: '' },
    mode: 'onChange'
  });
  const { enqueueSnackbar } = useSnackbar();
  const { loading: getTokenLoading, data: getTokenData, error: getTokenError } = useQuery<{ squad: Squad }>(GET_EXISTING_TOKEN, { variables: { id: squadId } });
  const [setToken, { called, data: setTokenData, loading: setTokenLoading, error: setTokenError }] = useMutation<{ squad: Squad }, { token: string }>(SET_DISCORD_TOKEN);

  const onSubmit: SubmitHandler<FormFields> = ({ token }) => {
    setToken({ variables: { token } });
  };

  useEffect(() => {
    if (called && setTokenData) {
      // TODO: check if token is set based on returned data.
      enqueueSnackbar('Successfully set the new discord token!', { variant: 'success' });
    }
  }, [setTokenData]);

  useEffect(() => {
    // TODO: set this to token instead of id
    if (getTokenData && getTokenData.squad && getTokenData.squad.id) {
      setValue('token', getTokenData.squad.id);
    }
  }, [getTokenData]);

  if (getTokenError || setTokenError) {
    return <div>error</div>;
  }

  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          control={control}
          error={formState.errors.token}
          icon={<Discord size={20} />}
          labelText=""
          loading={getTokenLoading || setTokenLoading}
          name="token"
          placeholder="place webhook URL here"
        />
      </form>
      <Alert
        action={{
          text: 'More information',
          execute: () => { window.open('https://support.discord.com/hc/en-us/articles/228383668-Intro-to-Webhooks', '_blank'); }
        }}
        text="Receive automated messages and data updates messages on text channels on your server. Scheduled reminders, report results...
        More information about Discord webhooks below."
        title="Discord webhook"
        variant="info"
      />
    </Container>
  );
};
