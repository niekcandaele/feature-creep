import { UserInputError } from 'apollo-server';
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

    squad.notificationConfig.discordWebhook = args.input.discordWebhook;
    squad = await squad.save();

    return squad;
  },
};
