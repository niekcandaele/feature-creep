import { BaseEntity } from './BaseEntity';

interface OrganisationOpts {
  id: string;
  name: string;
}

export class Organisation extends BaseEntity {
  //------------------------
  // Properties
  //------------------------
  public name: string;

  constructor(opts: OrganisationOpts) {
    super(opts);
    this.name = opts.name;
  }

  //------------------------
  // public methods
  //------------------------
  public async edit(): Promise<void> {}

  async init() {}
}
