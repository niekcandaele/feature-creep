import { UserInputError } from 'apollo-server';
import axios from 'axios';
import { GraphQLInputObjectType, GraphQLNonNull, GraphQLString } from 'graphql';

import { IContext } from '../../..';
import { Squad } from '../../../../rejson/entities/Squad';
import { squadType } from '../../types/squad';

const SetNotificationConfigInput = new GraphQLInputObjectType({
  name: 'SetNotificationConfigInput',
  fields: () => ({
    squadId: { type: new GraphQLNonNull(GraphQLString) },
    discordWebhook: { type: GraphQLString },
  }),
});

const webhookRegex = /discord.com\/api\/webhooks\/([^\/]+)\/([^\/]+)/;

export const setNotificationConfig = {
  type: squadType,
  description: 'Sets a notification config (currently Discord webhook)',
  args: {
    input: { type: SetNotificationConfigInput },
  },
  resolve: async (
    parent: Record<string, never>,
    args: {
      input: { squadId: string; discordWebhook: string };
    },
    context: IContext
  ) => {
    if (!args.input.discordWebhook) {
      throw new UserInputError('Must provide a Discord webhook URL');
    }

    let squad = await Squad.findOne(args.input.squadId);
    if (!squad) throw new UserInputError('Invalid squad ID');

    if (!webhookRegex.test(args.input.discordWebhook))
      throw new UserInputError('Discord webhook failed validation');

    const check = await sendWebhookTestMessage(args.input.discordWebhook);
    if (!check)
      throw new UserInputError(
        'Discord webhook correct form but cannot send a message'
      );

    squad.notificationConfig.discordWebhook = args.input.discordWebhook;
    squad = await squad.save();

    return squad;
  },
};

export async function sendWebhookTestMessage(webhookUrl: string) {
  try {
    const res = await axios.post(webhookUrl, {
      content:
        'This is a test message from Feature Creep, if you see this, the Discord webhook works!',
      username: 'Feature Creep',
    });

    return 200 <= res.status && res.status < 400;
  } catch (error) {
    return false;
  }
}
