import { gql } from '@apollo/client';

export const ADD_SALESPERSON = gql`
    mutation AddSalesperson(
        $first_name: String!
        $last_name: String!
        $phone_number: String
        $email: String!
        $password: String!
        $google_password: String
        $google_email: String
    ) {
        addSalesperson(
            first_name: $first_name
            last_name: $last_name
            phone_number: $phone_number
            email: $email
            password: $password
            google_password: $google_password
            google_email: $google_email
        ) {
            token
            sales_person {
                _id
                first_name
                last_name
                phone_number
                email
                password
            }
        }
    }
`;

export const LOGIN_SALESPERSON = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            sales_person {
                _id
                email
            }
        }
    }
`;

export const ADD_CLIENT = gql`
    mutation AddClient(
        $first_name: String!
        $last_name: String!
        $phone_number: String
        $email: String!
        $sales_person: ID!
        $status: String!
    ) {
        addClient(
            first_name: $first_name
            last_name: $last_name
            phone_number: $phone_number
            email: $email
            sales_person: $sales_person
            status: $status
        ) {
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

export const UPDATE_SALESPERSON = gql`
    mutation UpdateSalesperson(
        $salesperson_id: ID!
        $first_name: String
        $last_name: String
        $phone_number: String
        $email: String
        $password: String
        $google_password: String
        $google_email: String
    ) {
        updateSalesperson(
            id: $salesperson_id
            first_name: $first_name
            last_name: $last_name
            phone_number: $phone_number
            email: $email
            password: $password
            google_password: $google_password
            google_email: $google_email
        ) {
            token
            sales_person {
                _id
                email
                first_name
                last_name
                phone_number
                password
                google_password
                google_email
            }
        }
    }
`;

export const UPDATE_CLIENT = gql`
    mutation UpdateClientById(
        $clientId: ID!
        $firstName: String
        $lastName: String
        $phoneNumber: String
        $email: String
        $status: String
    ) {
        updateClient(
            id: $clientId
            first_name: $firstName
            last_name: $lastName
            phone_number: $phoneNumber
            email: $email
            status: $status
        ) {
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

export const ADD_EMAIL = gql`
    mutation AddEmail(
        $subject: String
        $text: String
        $date: String
        $sales_person: ID
        $client: ID
    ) {
        addEmail(
            subject: $subject
            text: $text
            date: $date
            sales_person: $sales_person
            client: $client
        ) {
            _id
            subject
            text
            date
            client {
                _id
                email
                first_name
                last_name
                phone_number
            }
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

export const SEND_EMAIL = gql`
    mutation SendEmail(
        $from: String!
        $to: String!
        $subject: String!
        $text: String!
        $html: String
        $auth: AuthInput!
    ) {
        sendEmail(
            from: $from
            to: $to
            subject: $subject
            text: $text
            html: $html
            auth: $auth
        )
    }
`;

export const SEND_SMS = gql`
    mutation SendSMS(
        $body: String!
        $salesPerson: ID!
        $client: ID!
    ) {
        sendSMS(
            body: $body
            sales_person: $salesPerson
            client: $client
        ) {
            success
            error
        }
    }
`;
