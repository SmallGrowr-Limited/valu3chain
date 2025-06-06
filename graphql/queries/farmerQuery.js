import { gql } from "@apollo/client";

export const GET_FARMERS = gql`
    query getFarmers {
        farmers{
            _id
            userId
            fullName
            gender
            dateOfBirth
            email
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