interface IQuestion {
  question: string;
  descriptionGood?: string;
  descriptionBad?: string;
}

export class RediSearch {
  async addQuestion(question: IQuestion) {
    // Try and find a question that already exists
    // If found, return that
    // Otherwise create + recreate index
  }

  private async createIndex() {
    // Kick off BG process to create index
  }

  async search(question: Partial<IQuestion>) {
    // Give questions with descriptions higher weight
  }
}

// Questions based on https://engineering.atspotify.com/2014/09/16/squad-health-check-model/
export const defaultQuestions = [
  {
    descGood:
      "We deliver great stuff ! We're proud of  it and our stakeholders are really happy",
    descBad:
      'We deliver crap. We feel ashamed to deliver it. Our stakeholders hate us.',
    q: 'Delivering value',
  },
  {
    descGood: 'Releasing is simple, safe, painless and mostly automated. ',
    descBad:
      'Releasing is risky, painful, lots of  manual work and takes forever.',
    q: 'Easy to release',
  },
  {
    descGood: 'We love going to work and have great fun working together! ',
    descBad: 'Boooooooring...',
    q: 'Fun',
  },
  {
    descGood:
      "We're proud of  the quality of  our code! It is clean, easy to read and has great test coverage. ",
    descBad:
      'Our code is a pile of  dung and technical debt is raging out of  control. ',
    q: 'Health of codebase',
  },
  {
    descGood: "We're learning lots of  interesting stuff  all the time!",
    descBad: 'We never have time to learn anything.',
    q: 'Learning',
  },
  {
    descGood:
      'We know exactly why we are here and we’re really excited about it! ',
    descBad:
      "We have no idea why we are here, there's no high lever picture or focus. Our so called mission is completely unclear and uninspiring. ",
    q: 'Mission',
  },
  {
    descGood:
      'We are in control of  our own destiny! We decide what to build and how to build it. ',
    descBad:
      'We are just pawns in a game of  chess with no influence over what we build or how we build it. ',
    q: 'Pawns or players',
  },
  {
    descGood: 'We get stuff  done really quickly! No waiting and no delays. ',
    descBad:
      'We never seem to get anything done. We keep getting stuck or interrupted. Stories keep getting stuck on dependencies. ',
    q: 'Speed',
  },
];
