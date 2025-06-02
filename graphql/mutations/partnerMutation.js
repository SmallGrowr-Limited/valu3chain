import { gql } from "@apollo/client";

export const PARTNER_PROFILE = gql`
  mutation registerPartner($input: PartnerInputData) {
    registerPartner(input: $input) {
      _id
      businessName
      contactPersonName
      email
      phoneNumber
      businessAddress
      businessPermit
      statesOfOperation
      businessRegistrationNumber
      haveFarmersDirectory
      termsOfServiceAgreement
    }
  }
`;
