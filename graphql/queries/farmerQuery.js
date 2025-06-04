import { gql } from "@apollo/client";

export const GET_FARMERS = gql`
    query getFarmers {
        onboardedFarmers{
            _id
            userId
            fullName
            gender
            dateOfBirth
            email
            password
            role
            phoneNumber
            address,
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