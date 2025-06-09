import { gql } from "@apollo/client";

export const GET_FARMERS = gql`
    query getFarmers {
        farmers{
            _id
            fullName
            #gender
            #dateOfBirth
            # email
            #phoneNumber
            address,
            # state
            # nationality
            # identification
            # profileImage
            farmAddress
            # farmSize
            cropType
            # bankName
            # accountNumber
            # agentId
        }
    }
    
`;
// GET SINGLE FARMER
export const GET_FARMER = gql`
  query GetFarmer($farmerId: ID) {
    farmer(farmerId: $farmerId) {
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

export const GET_FARMERS_BY_AGENT = gql`
  query GetFarmersByAgent($agentId: String!) {
    farmersByAgent(agentId: $agentId) {
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
