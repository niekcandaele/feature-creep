import { gql } from '@apollo/client';

export const GET_SQUAD_MEMBER_IDS = gql`
  query GET_SQUAD_jMEMBER_IDS($id: String){
    squad(id: $id) {
      members
    }
  }
`;
