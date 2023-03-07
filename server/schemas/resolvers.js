const { Client, Salesperson, Email, Sms } = require('../models');
const { ObjectId } = require('mongodb');
const { signToken } = require('../utils/auth');
const { AuthenticationError } = require('apollo-server-express');
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);
const http = require('http');
const MessagingResponse = require('twilio').twiml.MessagingResponse;

const resolvers = {
    Query: {
        clients: async () => {
            const clients = await Client.find({}).populate('sales_person');
            return clients.length > 0
                ? clients
                : [{ name: 'No clients found' }];
        },
        clientsBySalesperson: async (parent, args) => {
            const salesperson = await Salesperson.findById(args.salespersonId);
            if (!salesperson) {
                console.error(err);
                return { error: 'record not found' };
                throw new Error('Salesperson not found');
            }
            const clients = await Client.find({
                sales_person: salesperson._id,
            }).populate('sales_person');
            return clients;
        },
        salespeople: async () => {
            return Salesperson.find({});
        },
        salespersonById: async (parent, args) => {
            // findById return error, check later
            // return Salesperson.findById(ObjectId(args.id));
            const user = await Salesperson.find({
                _id: args.id,
            });
            return user;
        },
        clientById: async (paren, args) => {
            const client = await Client.find({
                _id: args.id,
            });
            return client;
        },
        allClientEmails: async (parent, { clientId }, context) => {
            // Validate input
            if (!ObjectId.isValid(clientId)) {
                throw new Error('Invalid client ID');
            }

            // Query the database for emails associated with the client ID
            const emails = await Email.find({ client: clientId }).populate(
                'sales_person client'
            );

            // Return the emails as an array
            return emails ? emails : [];
        },
        allClientSms: async (parent, { clientId }, context) => {
            // Validate input
            if (!ObjectId.isValid(clientId)) {
                throw new Error('Invalid client ID');
            }
            // Query the database for emails associated with the client ID
            const sms = await Sms.find({ client: clientId }).populate(
                'sales_person client'
            );
            return sms ? sms : [];
        },
        allSalespersonEmails: async (parent, { salespersonId }) => {
            // Validate input
            if (!ObjectId.isValid(salespersonId)) {
                throw new Error('Invalid salesperson ID');
            }
            // Query the database for emails associated with the client ID
            const emails = await Email.find({
                sales_person: salespersonId,
            }).populate('sales_person client');
            return emails ? emails : [];
        },
        allSalespersonSms: async (parent, { salespersonId }) => {
            // Validate input
            if (!ObjectId.isValid(salespersonId)) {
                throw new Error('Invalid client ID');
            }

            // Query the database for emails associated with the client ID
            const sms = await Sms.find({
                sales_person: salespersonId,
            }).populate('sales_person client');

            // Return the emails as an array
            return sms;
        },
        emailById: async (parent, { id }, context) => {
            // Validate input
            if (!ObjectId.isValid(id)) {
                throw new Error('Invalid email ID');
            }

            // Query the database for the email with the given ID
            const email = await Email.find({
                _id: id,
            }).populate('sales_person client');

            // Return the email as an array or empty array if no emails found
            return email ? email : [];
        },
        smsById: async (parent, { id }, context) => {
            // Validate input
            if (!ObjectId.isValid(id)) {
                throw new Error('Invalid sms ID');
            }

            // Query the database for the email with the given ID
            const sms = await Sms.find({
                _id: id,
            }).populate('sales_person client');

            // Return the email as an array or empty array if no sms found
            return sms ? [sms] : [];
        },
    },
    Client: {
        sales_person: async (parent) => {
            return Salesperson.findById(parent.sales_person);
        },
    },

    Mutation: {
        addSalesperson: async (
            parent,
            {
                first_name,
                last_name,
                phone_number,
                email,
                password,
                google_password,
                google_email,
            }
        ) => {
            try {
                const salesperson = await Salesperson.create({
                    first_name,
                    last_name,
                    phone_number,
                    email,
                    password,
                    google_password,
                    google_email,
                });
                const token = signToken(salesperson);
                return { token: token, sales_person: salesperson };
            } catch (err) {
                console.error(err);
                return null;
            }
        },

        login: async (parent, { email, password }) => {
            const salesperson = await Salesperson.findOne({ email });

            if (!salesperson) {
                throw new AuthenticationError(
                    'No user found with this email address'
                );
            }

            const correctPw = await salesperson.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const token = signToken(salesperson);

            return { token, sales_person: salesperson };
        },

        addClient: async (
            parent,
            { first_name, last_name, phone_number, email, sales_person, status }
        ) => {
            const client = new Client({
                first_name,
                last_name,
                phone_number,
                email,
                sales_person,
                status,
            });

            try {
                await client.save();
                return client;
            } catch (err) {
                console.error(err);
                return null;
            }
        },

        updateSalesperson: async (parent, args, context) => {
            // Extract the ID and fields to update from the input arguments
            const { id, ...fields } = args;

            // Update the salesperson in the database
            const updatedSalesperson = await Salesperson.findByIdAndUpdate(
                id,
                fields,
                { new: true } // Return the updated document
            );

            return updatedSalesperson;
        },

        updateClient: async (parent, args, context) => {
            // Extract the ID and fields to update from the input arguments
            const { id, ...fields } = args;

            // Update the client in the database
            const updatedClient = await Client.findByIdAndUpdate(
                id,
                fields,
                { new: true } // Return the updated document
            );

            return updatedClient;
        },

        addEmail: async (
            parent,
            { subject, body, date, sales_person, client, received }
        ) => {
            const email = new Email({
                subject,
                body,
                date,
                sales_person,
                client,
                received,
            });

            try {
                await email.save();
                return email.populate('sales_person client');
            } catch (err) {
                console.error(err);
                return null;
            }
        },

        addSms: async (
            parent,
            { body, date, sales_person, client, received }
        ) => {
            const sms = new Sms({ body, date, sales_person, client, received });
            try {
                await sms.save();
                return sms.populate('sales_person client');
            } catch (err) {
                console.error(err);
                return null;
            }
        },

        sendSMS: async (_, { clientPhoneNumber, salesPersonPhoneNumber, smsBody }) => {
            try {
                const message = await client.messages.create({
                body: smsBody,
                from: salesPersonPhoneNumber,
                to: clientPhoneNumber
                });
                console.log(message.sid);
                return {
                success: true,
                message: 'SMS sent successfully'
                };
            } catch (err) {
                console.log(err);
                return {
                success: false,
                message: 'Failed to send SMS'
                };
            }
        },

        replySMS: async (_, { clientPhoneNumber, smsBody, salesPersonPhoneNumber }) => {
        try {
            const response = await client.messages.create({
            body: smsBody,
            to: clientPhoneNumber,
            from: salesPersonPhoneNumber,
            });
    
            // Send TwiML auto-response message
            const twiml = new twilio.twiml.MessagingResponse();
            twiml.message('I received your message and will respond shortly.');
    
            return twiml.toString();
            } catch (err) {
                console.error(err);
                throw new Error('Failed to send SMS message');
            }
        }, 
    
        sendEmail: async (parent, { to, from, subject, text }) => {
            this.addEmail({
                subject,
                body: text,
                date: new Date(),
                sales_person: from,
                client: to,
                received: false,
            });
        },
    },
};


module.exports = resolvers;
