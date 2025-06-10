import { gql} from "@apollo/client";

export const SIGN_UP = gql`
  mutation signup($input: SignupInput!) {
    signUp(input: $input) {
      token
      user {
        _id
        userId
        email
        role
        password
      }
    }
  }
`;


export const LOGIN_USER = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      token
      user {
        _id
        userId
        email
        role
      }
    }
  }
`;

