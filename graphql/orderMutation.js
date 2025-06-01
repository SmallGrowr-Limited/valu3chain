import {gql} from "@apollo/client"

export const CREATE_PRODUCT_ORDER = gql`
  mutation CreateProductOrder($input: Product_OrderInput!) {
    createProductOrder(input: $input) {
      id
      productName
      quantity
      unit
      unitPrice
      totalPrice
      variety
      brand
      moisture
      purchaseType
      deliveryAddress
      deliverMethod
      paymentTerm
      paymentMode
    }
  }
`;
