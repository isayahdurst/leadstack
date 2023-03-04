import { gql } from '@apollo/client';

// create a GraphQL query to be executed by Apollo Client
export const CLIENTS = gql`
query {
    getAllClients {
      _id
      first_name
      last_name
      phone_number
      email
      sales_person {
        _id
        first_name
        last_name
        phone_number
        email
      }
    }
  }
`;

export const SALESPEOPLE = gql`
query {
    getAllSalespeople {
      _id
      first_name
      last_name
      phone_number
      email
    }
  }
`;

export const CLIENTS_BY_SALESPERSON = gql`
query {
    getClientsBySalesperson(salespersonId: "salesperson_id") {
      _id
      first_name
      last_name
      phone_number
      email
      sales_person {
        _id
        first_name
        last_name
        phone_number
        email
      }
    }
  }
`;

export const PROFILE_QUERY = gql`
query getSalespersonById($id: ID!) {
  salespersonById(id: $id) {
    _id
    email
    first_name
    last_name
    phone_number
  }
}
`;
