import { expect } from 'chai';

import { Squad } from '../../../../rejson/entities/Squad';
import { testClient } from '../../../../test/testClient.spec';

describe('MUTATION setNotificationConfig', () => {
  it('happy path', async () => {
    const squad = await Squad.create({ name: 'cool squad' });

    const validWebhook =
      'https://discord.com/api/webhooks/842715899009826836/885QWmjX7Ax-NYz0RX3-iJDS1XM4g4umjEdlYNpye_wy6tUHqWhvq_2fpUSPDT2_Ogmi';
    const mutation = `mutation {
            setNotificationConfig(input: { squadId: "${squad.id}", discordWebhook: "${validWebhook}" }) {
              name
              notificationConfig {
                discordWebhook
              }
            }
          }
          `;

    const res = await testClient.mutate({ mutation });

    expect(res.data.setNotificationConfig.name).to.be.equal('cool squad');
    expect(
      res.data.setNotificationConfig.notificationConfig.discordWebhook
    ).to.be.equal(validWebhook);
  });

  it('Rejects invalid squad ids', async () => {
    const validWebhook =
      'https://discord.com/api/webhooks/842715899009826836/885QWmjX7Ax-NYz0RX3-iJDS1XM4g4umjEdlYNpye_wy6tUHqWhvq_2fpUSPDT2_Ogmi';
    const mutation = `mutation {
            setNotificationConfig(input: { squadId: "blablabla", discordWebhook: "${validWebhook}" }) {
              name
              notificationConfig {
                discordWebhook
              }
            }
          }
          `;

    const res = await testClient.mutate({ mutation });
    expect(res.errors).to.have.length(1);
    if (!res.errors) throw new Error('error undefined');
    expect(res.errors[0].message).to.be.equal('Invalid squad ID');
  });

  it('Rejects invalid discord webhook data', async () => {
    const squad = await Squad.create({ name: 'cool squad' });

    const webhook = 'not a real webhook string';
    const mutation = `mutation {
            setNotificationConfig(input: { squadId: "${squad.id}", discordWebhook: "${webhook}" }) {
              name
              notificationConfig {
                discordWebhook
              }
            }
          }
          `;

    const res = await testClient.mutate({ mutation });

    expect(res.errors).to.have.length(1);
    if (!res.errors) throw new Error('error undefined');
    expect(res.errors[0].message).to.be.equal(
      'Discord webhook failed validation'
    );
  });
});
