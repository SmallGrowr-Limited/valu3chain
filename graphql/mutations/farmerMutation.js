import { gql } from "@apollo/client";

export const REGISTER_FARMER = gql`
  mutation registerFarmer($input: FarmerData) {
    registerFarmer(input: $input) {
      _id
      fullName
      gender
      dateOfBirth
      email
      phoneNumber
      address
      state
      nationality
      identification
      profileImage
      farmAddress
      farmSize
      cropType
      bankName
      accountNumber
      agentId
    }
  }
`;