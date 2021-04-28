import { IContext } from '../..';
import { personType } from '../types/person';

export const squadQuery = {
  type: personType,
  args: {},
  resolve: (
    parent: Record<string, never>,
    args: { [argName: string]: string },
    context: IContext
  ) => {
    return context.user;
  },
};
