import { gql} from "@apollo/client";

export const SIGN_UP = gql`
  mutation signup($input: SignupInput!) {
    signUp(input: $input) { 
      _id
      userId
      email
      role
      password
    }
  }
`;
