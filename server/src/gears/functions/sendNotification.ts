import { GearsFunction } from '../GearsFunction';

export class GearsSendNotification extends GearsFunction {
  background = true;
  fileName = 'send_notification.py';
  requirements = ['requests'];
}
