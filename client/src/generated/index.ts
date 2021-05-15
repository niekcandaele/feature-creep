import { gql } from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type AddMemberType = {
  personId: Scalars['String'];
  squadId: Scalars['String'];
};

export type Answer = {
  id?: Maybe<Scalars['String']>;
  answer?: Maybe<Scalars['String']>;
  person?: Maybe<Person>;
};

export type CreateSquad = {
  name: Scalars['String'];
};

export type EditPersonType = {
  email?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
};

export type GetSquadInput = {
  filter?: Maybe<SquadFilterType>;
};

export type Mutation = {
  editPerson?: Maybe<Person>;
  addMemberToSquad?: Maybe<Squad>;
  removeMemberFromSquad?: Maybe<Squad>;
  createSquad?: Maybe<Squad>;
  createSession?: Maybe<Session>;
  addQuestion?: Maybe<Question>;
  answerQuestion?: Maybe<Answer>;
  endSession?: Maybe<Session>;
  /** Sets a squad to "open" for 30 minutes, which means anyone with a link can join the squad */
  setSquadOpen?: Maybe<Squad>;
  /** Sets a notification config (currently Discord webhook) */
  setNotificationConfig?: Maybe<Squad>;
  setActiveQuestion?: Maybe<Session>;
};


export type MutationEditPersonArgs = {
  person?: Maybe<EditPersonType>;
};


export type MutationAddMemberToSquadArgs = {
  input?: Maybe<AddMemberType>;
};


export type MutationRemoveMemberFromSquadArgs = {
  input?: Maybe<RemoveMemberType>;
};


export type MutationCreateSquadArgs = {
  input?: Maybe<CreateSquad>;
};


export type MutationCreateSessionArgs = {
  input: CreateSessionInput;
};


export type MutationAddQuestionArgs = {
  input?: Maybe<AddQuestion>;
};


export type MutationAnswerQuestionArgs = {
  input?: Maybe<AnswerQuestion>;
};


export type MutationEndSessionArgs = {
  input?: Maybe<EndSession>;
};


export type MutationSetSquadOpenArgs = {
  input?: Maybe<SetOpenStatusInput>;
};


export type MutationSetNotificationConfigArgs = {
  input?: Maybe<SetNotificationConfigInput>;
};


export type MutationSetActiveQuestionArgs = {
  input: SetActiveQuestionInput;
};

export type NotificationConfig = {
  discordWebhook?: Maybe<Scalars['String']>;
};

/** A person */
export type Person = {
  id?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
};

export type Query = {
  ping?: Maybe<Scalars['String']>;
  person?: Maybe<Person>;
  squads?: Maybe<Array<Maybe<Squad>>>;
  squad?: Maybe<Squad>;
  session?: Maybe<Session>;
  search?: Maybe<Array<Maybe<SearchResponse>>>;
  question?: Maybe<Question>;
};


export type QueryPersonArgs = {
  id?: Maybe<Scalars['String']>;
};


export type QuerySquadsArgs = {
  filter?: Maybe<GetSquadInput>;
};


export type QuerySquadArgs = {
  id: Scalars['String'];
};


export type QuerySessionArgs = {
  id: Scalars['String'];
};


export type QuerySearchArgs = {
  search: Scalars['String'];
};


export type QueryQuestionArgs = {
  questionId: Scalars['String'];
  sessionId: Scalars['String'];
};

export type Question = {
  id?: Maybe<Scalars['String']>;
  question?: Maybe<Scalars['String']>;
  descriptionGood?: Maybe<Scalars['String']>;
  descriptionBad?: Maybe<Scalars['String']>;
  total?: Maybe<Scalars['Int']>;
  answers?: Maybe<Array<Maybe<Answer>>>;
};

export type RemoveMemberType = {
  personId: Scalars['String'];
  squadId: Scalars['String'];
};

export type SearchResponse = {
  question?: Maybe<Scalars['String']>;
  descriptionBad?: Maybe<Scalars['String']>;
  descriptionGood?: Maybe<Scalars['String']>;
};

/** A sesion */
export type Session = {
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  active?: Maybe<Scalars['Boolean']>;
  questions?: Maybe<Array<Maybe<Question>>>;
  activeQuestion?: Maybe<Question>;
};

export type SetNotificationConfigInput = {
  squadId: Scalars['String'];
  discordWebhook?: Maybe<Scalars['String']>;
};

export type SetOpenStatusInput = {
  squadId: Scalars['String'];
};

/** A squad */
export type Squad = {
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  members?: Maybe<Array<Maybe<Person>>>;
  open?: Maybe<Scalars['Boolean']>;
  activeSession?: Maybe<Session>;
  sessions?: Maybe<Array<Maybe<Session>>>;
  notificationConfig?: Maybe<NotificationConfig>;
};

export enum SquadFilterType {
  Memberof = 'MEMBEROF',
  All = 'ALL'
}

export type AddQuestion = {
  sessionId: Scalars['String'];
  question?: Maybe<QuestionInput>;
};

export type AnswerQuestion = {
  answer: Scalars['Int'];
  questionId: Scalars['String'];
  sessionId: Scalars['String'];
};

export type CreateSessionInput = {
  squadId: Scalars['String'];
};

/** Ends a session. After this, no new questions or answers can be added */
export type EndSession = {
  sessionId: Scalars['String'];
};

export type QuestionInput = {
  question: Scalars['String'];
  descriptionGood?: Maybe<Scalars['String']>;
  descriptionBad?: Maybe<Scalars['String']>;
};

export type SetActiveQuestionInput = {
  sessionId: Scalars['String'];
  questionId: Scalars['String'];
};


      export interface PossibleTypesResultData {
        possibleTypes: {
          [key: string]: string[]
        }
      }
      const result: PossibleTypesResultData = {
  "possibleTypes": {}
};
      export default result;
    