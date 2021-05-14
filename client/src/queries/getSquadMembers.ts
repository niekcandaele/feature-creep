import { gql } from '@apollo/client';

export const GET_SQUAD_MEMBERS = gql`
  query GET_SQUAD_MEMBERS($id: String!){
    squad(id: $id) {
      members {
        id
        firstName
        lastName
      }
    }
  }
`;
