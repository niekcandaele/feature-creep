import { gql } from '@apollo/client';

export const GET_OWN_SQUADS = gql`
  query GET_OWN_SQUADS($input: GetSquadInput) {
    squads(filter: $input){
    name
    id
    members {
      id
    }
    activeSession {
      id
    }
  }
}
`;
