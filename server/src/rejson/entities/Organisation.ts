import { BaseEntity } from './BaseEntity';

interface OrganisationOpts {
  name: string;
}

export class Organisation extends BaseEntity {
  //------------------------
  // Properties
  //------------------------
  public name: string;

  constructor(opts: OrganisationOpts) {
    super();
    this.name = opts.name;
  }

  //------------------------
  // public methods
  //------------------------
  public async edit(): Promise<void> {}
}
