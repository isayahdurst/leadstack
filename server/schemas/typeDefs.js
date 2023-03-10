const { gql } = require('graphql-tag');

const typeDefs = gql`
    type Salesperson {
        _id: ID!
        first_name: String!
        last_name: String!
        phone_number: String
        email: String!
        password: String!
        google_password: String
        google_email: String
    }

    type Auth {
        token: ID!
        sales_person: Salesperson
    }

    type Client {
        _id: ID!
        first_name: String!
        last_name: String!
        phone_number: String
        email: String!
        sales_person: Salesperson
        status: String!
    }

    type Sms {
        _id: ID!
        body: String
        date: String
        sales_person: Salesperson
        client: Client
        received: Boolean
        to: String
        from: String
    }

    type SendSMSResponse {
        success: Boolean!
        error: String!
    }

    type Email {
        _id: ID!
        text: String
        subject: String
        date: String
        sales_person: Salesperson
        client: Client
    }

    type Query {
        clients: [Client]
        salespeople: [Salesperson]
        clientsBySalesperson(salespersonId: ID!): [Client]
        salespersonById(id: ID!): [Salesperson]
        clientById(id: ID!): [Client]
        allClientEmails(clientId: ID!): [Email]
        allClientSms(clientId: ID!): [Sms]
        allSalespersonEmails(salespersonId: ID!): [Email]
        allSalespersonSms(salespersonId: ID!): [Sms]
        emailById(id: ID!): [Email]
        smsById(id: ID!): [Sms]
    }

    type Mutation {
        login(email: String!, password: String!): Auth

        addSalesperson(
            first_name: String!
            last_name: String!
            phone_number: String
            email: String!
            password: String!
            google_password: String
            google_email: String
        ): Auth

        updateSalesperson(
            id: ID!
            first_name: String
            last_name: String
            phone_number: String
            email: String
            password: String
            google_password: String
            google_email: String
        ): Auth

        addClient(
            first_name: String!
            last_name: String!
            phone_number: String
            email: String
            sales_person: ID!
            status: String!
        ): Client

        updateClient(
            id: ID!
            first_name: String
            last_name: String
            phone_number: String
            email: String
            status: String
        ): Client

        addEmail(
            subject: String
            text: String
            date: String
            sales_person: ID
            client: ID
        ): Email

        addSMS(
            body: String
            date: String!
            sales_person: ID!
            client: ID!
            received: Boolean!
            to: String
            from: String
        ): Sms

        sendEmail(
            from: String!
            to: String!
            subject: String!
            text: String!
            html: String
            auth: AuthInput!
        ): String!

        sendSMS(
            body: String!
            sales_person: ID!
            client: ID!
        ): SendSMSResponse

        replySMS(
            body: String!
            sales_person: ID!
            client: ID!
        ): Sms
    }

    input AuthInput {
        user: String!
        pass: String!
    }
`;

module.exports = typeDefs;
