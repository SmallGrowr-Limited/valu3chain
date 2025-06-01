
import { gql } from "@apollo/client";

export const SIGNUP_MUTATION =gql `
  mutation Signup($input: SignupInput!) {
    signup(input: $input) {
      token
      user {
        _id
        businessName
        contactPersonName
        email
        phoneNumber
        password
        businessAddress
        userObjective
        businessPermit
        statesOfOperation
        businessRegistrationNumber
        haveFarmersDirectory
      }
    }
  }
`;

export const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        name
        email
      }
    }
  }
`;
