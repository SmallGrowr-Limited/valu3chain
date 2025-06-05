import { gql} from "@apollo/client";

export const EXTENSION_AGENT = gql`
  mutation registerAgent($input: AgentInputData) {
    registerAgent(input: $input) {
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