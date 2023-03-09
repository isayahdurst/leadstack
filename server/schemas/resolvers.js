const { Client, Salesperson, Email, Sms } = require('../models');
const { ObjectId } = require('mongodb');
const { signToken } = require('../utils/auth');
const { GraphQLError, isLeafType } = require('graphql');
const bcrypt = require('bcrypt');
const path = require('path');
const { constants } = require('perf_hooks');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

const useEmail = require('../utils/useMail');

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilio = require('twilio')(accountSid, authToken);
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
            console.log(args);
            const salesperson = await Salesperson.findById(args.salespersonId);
            if (!salesperson) {
                return { error: 'record not found' };
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
            console.log(user);
            //return user;
            return user ? user : null;
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
                // Check for email that's already in use.
                console.log(err.message.includes('duplicate'));
                if (err.message.includes('duplicate')) {
                    throw new GraphQLError(
                        'Email already in use, please use another email.',
                        {
                            extensions: { code: 'NO_USER_FOUND' },
                        }
                    );
                }
                console.error(err);
                return err;
            }
        },

        login: async (parent, { email, password }) => {
            const salesperson = await Salesperson.findOne({ email });

            if (!salesperson) {
                throw new GraphQLError(
                    'No user found with this email address',
                    {
                        extensions: { code: 'NO_USER_FOUND' },
                    }
                );
            }

            const correctPw = await salesperson.isCorrectPassword(password);

            if (!correctPw) {
                throw new GraphQLError(
                    'Email/password combination incorrect. Please try again.',
                    {
                        extensions: { code: 'INCORRECT_CREDENTIALS' },
                    }
                );
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

            let updatedSalesPerson;

            if ('password' in args) {
                const saltRounds = 10;
                const newPass = await bcrypt.hash(args.password, saltRounds);
                fields.password = newPass;

                updatedSalesperson = await Salesperson.findByIdAndUpdate(
                    id,
                    fields,
                    { new: true } // Return the updated document
                );

                const token = signToken(updatedSalesperson);
                return { token: token, sales_person: updatedSalesperson };
            } else {
                // Update the salesperson in the database
                updatedSalesperson = await Salesperson.findByIdAndUpdate(
                    id,
                    fields,
                    { new: true } // Return the updated document,
                );
            }

            const token = signToken(updatedSalesperson);
            return { token: token, sales_person: updatedSalesperson };
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
            { subject, text, date, sales_person, client }
        ) => {
            console.log('addEmail', subject, text, date, sales_person, client);
            const email = new Email({
                subject,
                text,
                date,
                sales_person,
                client,
            });

            try {
                await email.save();
                return email.populate('sales_person client');
            } catch (err) {
                console.error(err);
                return null;
            }
        },

        addSMS: async (
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

        sendSMS: async (parent, { body, sales_person, client }) => {
            try {
                // Find the sales person in the database
                const salespersonObj = await Salesperson.findById(sales_person);

                // Check if the sales person exists
                if (!salespersonObj) {
                    return {
                        success: false,
                        error: 'Failed to send SMS: Sales person not found',
                    };
                }

                // Find the client in the database
                const clientObj = await Client.findById(client);

                //Check if the client exists
                if (!clientObj) {
                    return {
                        success: false,
                        error: 'Failed to send SMS: Client not found',
                    };
                }

                const from = salespersonObj.phone_number;
                const to = clientObj.phone_number;

                const message = await twilio.messages.create({
                    body,
                    from,
                    to,
                });
                console.log(message.sid);

                // Create a new Sms document and save it to the database
                const sms = new Sms({
                    date: new Date(),
                    body,
                    from,
                    to,
                    received: false,
                });
                await sms.save();

                return {
                    success: true,
                    error: 'SMS sent successfully',
                };
            } catch (err) {
                console.log(err);
                return {
                    success: false,
                    error: 'Failed to send SMS',
                };
            }
        },

        replySMS: async (
            parent,
            { body, sales_person_id, client_id },
            { Salesperson, Client }
        ) => {
            try {
                // Find the sales person in the database
                const salesperson = await Salesperson.findById(sales_person_id);

                // Check if the sales person exists
                if (!salesperson) {
                    return {
                        success: false,
                        message: 'Failed to send SMS: Sales person not found',
                    };
                }

                // Find the client in the database
                const client = await Client.findById(client_id);

                //Check if the client exists
                if (!client) {
                    return {
                        success: false,
                        message: 'Failed to send SMS: Client not found',
                    };
                }
                const response = await client.messages.create({
                    body: body,
                    from: salesperson.phone_number,
                    to: client.phone_number,
                });

                // Create a new Sms document and save it to the database
                const sms = new Sms({
                    date: new Date(),
                    body: body,
                    from: from,
                    to: to,
                    received: true,
                });
                await sms.save();

                // Send TwiML auto-response message
                const twiml = new twilio.twiml.MessagingResponse();
                twiml.message(
                    'I received your message and will respond shortly.'
                );

                return twiml.toString();
            } catch (err) {
                console.error(err);
                throw new Error('Failed to send SMS message');
            }
        },

        sendEmail: async (parent, args) => {
            try {
                await useEmail(args);
                return 'Email sent successfully';
            } catch (err) {
                console.log(err);
                return 'Email failed to send';
            }
        },
    },
};

module.exports = resolvers;
