import { gql } from '@apollo/client';

export const GET_PERSON = gql`
  query GET_PERSON ($id: String){
    person(id: $id) {
      firstName
      lastName
      email
    }
  }
`;
