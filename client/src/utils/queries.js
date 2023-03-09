import { gql } from '@apollo/client';

// create a GraphQL query to be executed by Apollo Client
export const CLIENTS = gql`
    query getAllClients {
        clients {
            _id
            first_name
            last_name
            phone_number
            email
            status
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
    query getAllSalespeople {
        salespeople {
            _id
            first_name
            last_name
            phone_number
            email
        }
    }
`;

export const CLIENTS_BY_SALESPERSON = gql`
query ClientsBySalesperson($salespersonId: ID!) {
    clientsBySalesperson(salespersonId: $salespersonId) {
      _id
      email
      first_name
      last_name
      phone_number
      status
      sales_person {
        _id
        email
      }
    }
  }
`;

export const PROFILE_QUERY = gql`
    query SalespersonById($id: ID!) {
        salespersonById(id: $id) {
            _id
            email
            first_name
            last_name
            phone_number
        }
    }
`;

export const CLIENT_INFO_BY_ID = gql`
    query getClientById($clientId: ID!) {
        clientById(id: $clientId) {
            _id
            email
            first_name
            last_name
            phone_number
            sales_person {
                _id
                email
                first_name
                last_name
                phone_number
            }
        }
    }
`;

export const CLIENT_EMAILS = gql`
    query getAllEmailByClientId($clientId: ID!) {
        allClientEmails(clientId: $clientId) {
            _id
            body
            subject
            date
            received
            client {
                _id
                first_name
                last_name
                phone_number
                email
            }
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

export const CLIENT_SMS = gql`
    query getAllSmsByClientId($clientId: ID!) {
        allClientSms(clientId: $clientId) {
            _id
            body
            date
            received
            client {
                _id
                first_name
                last_name
                phone_number
                email
            }
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

export const SALESPERSON_EMAILS = gql`
    query getAllEmailBySalespersonId($salespersonId: ID!) {
        allSalespersonEmails(clientId: $salespersonId) {
            _id
            body
            subject
            date
            received
            client {
                _id
                first_name
                last_name
                phone_number
                email
            }
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

export const SALESPERSON_SMS = gql`
    query getAllSmsBySalespersonId($salespersonId: ID!) {
        allSalespersonSms(clientId: $salespersonId) {
            _id
            body
            date
            received
            client {
                _id
                first_name
                last_name
                phone_number
                email
            }
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

export const EMAIL_BY_ID = gql`
    query getEmailById($emailId: ID!) {
        emailById(id: $emailId) {
            _id
            subject
            body
            date
            received
            client {
                first_name
                last_name
                phone_number
                email
            }
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

export const SMS_BY_ID = gql`
    query getSmsById($smsId: ID!) {
        smsById(id: $smsId) {
            _id
            body
            date
            received
            client {
                first_name
                last_name
                phone_number
                email
            }
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

export const GET_ALL_CLIENT_SMS = gql`
  query allClientSms($clientId: ID!) {
    allClientSms(clientId: $clientId) {
      _id
      message
      sent_at
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
