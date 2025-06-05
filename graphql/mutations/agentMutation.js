import { gql} from "@apollo/client";

export const EXTENTION_AGENT = gql`
  mutation registerAgent($input: AgentInputData) {
    register(input: $input) {
      _id
      agentId
      fullName
      gender
      dateOfBirth
      phoneNumber
      nationality
      state
      address
      idNumber
      imageUrl
      disability
      bankName
      accountNumber
      businessOutlet
      businessName
      businessType
      registrationCategory
    }
  }
`;