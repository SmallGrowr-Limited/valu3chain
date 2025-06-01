import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation LoginUser(
    $email: String
    $password: String
    $role: String
  ) {
    loginUser(email: $email, password: $password, role: $role) {
      token
      user {
        id
        email
        role
        profile {
          ... on InvestorProfile {
            investmentFocus
          }
          ... on AgentProfile {
            extensionField
          }
        }
      }
    }
  }
`;

export const SIGNUP_USER = gql`
  mutation SignupUser(
    $email: String
    $password: String
    $role: String
    $profileData: ProfileInput
  ) {
    signupUser(
      email: $email
      password: $password
      role: $role
      profileData: $profileData
    ) {
      token
      user {
        id
        email
        role
      }
    }
  }
`;
