import { gql } from '@apollo/client';

export const ADD_SALESPERSON = gql`
  mutation AddSalesperson($first_name: String!, $last_name: String!, $phone_number: String, $email: String!, $password: String!) {
    addSalesperson(first_name: $first_name, last_name: $last_name, phone_number: $phone_number, email: $email, password: $password) {
      _id
      first_name
      last_name
      phone_number
      email
      password
    }
  }
`;

export const ADD_CLIENT = gql`
  mutation AddClient($first_name: String!, $last_name: String!, $phone_number: String, $email: String!, $sales_person: ID!, $status: String!) {
    addClient(first_name: $first_name, last_name: $last_name, phone_number: $phone_number, email: $email, sales_person: $sales_person, status: $status) {
      _id
      first_name
      last_name
      phone_number
      email
      sales_person {
        _id
      }
      status
    }
  }
`;
