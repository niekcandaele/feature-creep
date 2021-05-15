import { gql } from '@apollo/client';

export const CREATE_SESSION = gql`
  mutation CREATE_SESSION($input: createSessionInput!){
    createSession(input: $input){
      id
    }
  }
`;

export const SEARCH = gql`
  query SEARCH($input: String!) {
    search(search: $input) {
    	question
      descriptionBad
      descriptionGood
    }
  }
`;

export const ADD_QUESTION = gql`
  mutation addQuestion($input: addQuestion) {
    addQuestion(
      input: $input
    ) {
      id
      question
      answers {
        answer
      }
    }
  }
`;
