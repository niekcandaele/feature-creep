/* TODO: Rewrite this to more abstract form so other services can use this aswell. */

import { Alert, TextField } from 'components';
import { FC, useEffect } from 'react';
import { SubmitHandler, useForm, Resolver } from 'react-hook-form';
import styled from 'styled-components';
import { RiDiscordFill as Discord } from 'react-icons/ri';
import { useMutation, gql } from '@apollo/client';
import { useSnackbar } from 'notistack';
import { Squad } from 'generated';

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

const resolver: Resolver<FormFields> = async (values) => {
  return {
    values: !values.token ? {} : values,
    errors: !values.token
      ? {
        token: {
          type: 'validate',
          message: 'A valid token is required to enable Discord notifactions.'
        }
      } : {}
  };
};

export const DiscordWebhook: FC = () => {
  const { handleSubmit, control, formState } = useForm<FormFields>({ resolver });
  const { enqueueSnackbar } = useSnackbar();
  const [setToken, { called, data }] = useMutation<{ squad: Squad }, { token: string }>(SET_DISCORD_TOKEN);

  const onSubmit: SubmitHandler<FormFields> = () => {
    setToken({ variables: { token: '12345' } });
  };

  useEffect(() => {
    if (called && data) {
      // TODO: check if token is set based on returned data.
      enqueueSnackbar('Successfully set the new discord token!', { variant: 'success' });
    }
  }, [data]);

  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          control={control}
          error={formState.errors.token}
          icon={<Discord size={20} />}
          labelText="Discord webhook"
          name="token"
          placeholder="XXXX-XXXX-XXXX-XXXX"
        />
      </form>
      <Alert
        action={{
          text: 'More information',
          execute: () => { window.location.href = 'https://support.discord.com/hc/en-us/articles/228383668-Intro-to-Webhooks'; }
        }}
        text="Automatically receive session reports on Discord."
        title="Discord webhook"
        variant="info"
      />
    </Container>
  );
};
