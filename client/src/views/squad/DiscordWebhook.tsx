/* TODO: Rewrite this to more abstract form so other services can use this aswell. */

import { Alert, TextField, Button } from 'components';
import { FC, useEffect, useMemo } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import styled from 'styled';
import { RiDiscordFill as Discord } from 'react-icons/ri';
import { useMutation, gql, useQuery } from '@apollo/client';
import { useSnackbar } from 'notistack';
import { SetNotificationConfigInput, Squad } from 'generated';
import { useValidationSchema } from 'hooks';

const Container = styled.div`
  width: 100%;
  form button {
    margin-left: auto;
  }
`;

type FormFields = {
  token: string;
}

const GET_EXISTING_TOKEN = gql`
  query GET_EXISTING_TOKEN($id: String!){
    squad(id: $id){
      notificationConfig {
        discordWebhook
      }
    }
  }
`;

const SET_DISCORD_TOKEN = gql`
  mutation SET_DISCORD_TOKEN($input: SetNotificationConfigInput) {
    setNotificationConfig(input: $input){
      id
    }
  }
`;

interface DiscordWebhookProps {
  squadId: string;
}
export const DiscordWebhook: FC<DiscordWebhookProps> = ({ squadId }) => {
  const webhookRegex = /discord.com\/api\/webhooks\/([^\/]+)\/([^\/]+)/;

  const validationSchema = useMemo(
    () => yup.object({
      token: yup.string().matches(webhookRegex, 'This is not a valid webhook format.').required('This field is required')
    }), []
  );

  const { handleSubmit, control, formState, setValue } = useForm<FormFields>({
    resolver: useValidationSchema(validationSchema),
    defaultValues: { token: '' },
    mode: 'onChange'
  });
  const { enqueueSnackbar } = useSnackbar();
  const { loading: getTokenLoading, data: getTokenData, error: getTokenError } = useQuery<{ squad: Squad }>(GET_EXISTING_TOKEN, { variables: { id: squadId } });
  const [setToken, { called, data: setTokenData, loading: setTokenLoading, error: setTokenError }] = useMutation<{ squad: Squad }, { input: SetNotificationConfigInput }>(SET_DISCORD_TOKEN);

  const onSubmit: SubmitHandler<FormFields> = ({ token }) => {
    setToken({ variables: { input: { discordWebhook: token, squadId: squadId } } });
  };

  useEffect(() => {
    if (called && setTokenData) {
      // TODO: check if token is set based on returned data.
      enqueueSnackbar('Successfully set the new discord token! You should have received a test message in one of your Discord channels.', { variant: 'success' });
    }
  }, [setTokenData]);

  useEffect(() => {
    if (getTokenData && getTokenData.squad && getTokenData.squad.notificationConfig?.discordWebhook) {
      setValue('token', getTokenData.squad.notificationConfig?.discordWebhook);
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
        <Button
          isLoading={setTokenLoading}
          onClick={() => { /* dummy */ }}
          text="Save token"
          type="submit"
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
