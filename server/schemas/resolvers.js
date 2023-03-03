const { Client, Salesperson } = require("../models");
const bcrypt = require('bcrypt');

const resolvers = {
    Query: {
        // clients: async () => {
        //     return Client.find({}).populate("sales_person");
        // },
        clients: async () => {
            const clients = await Client.find({}).populate("sales_person");
            return clients.length > 0 ? clients : [{ name: "No clients found" }];
        },
        clientsBySalesperson: async (parent, args) => {
            const salesperson = await Salesperson.findById(args.salespersonId);
            if (!salesperson) {
                console.error(err);
                return null;
                throw new Error("Salesperson not found");
            }
            const clients = await Client.find({
                sales_person: salesperson._id,
            }).populate("sales_person");
            return clients;
        },
        salespeople: async () => {
            return Salesperson.find({});
        },
    },
    Client: {
        sales_person: async (parent) => {
            return Salesperson.findById(parent.sales_person);
        },
    },

    Mutation: {
        addSalesperson: async (
            _,
            { first_name, last_name, phone_number, email, password }
        ) => {
            const hashedPassword = await bcrypt.hash(password, 10);

            const salesperson = new Salesperson({
                first_name,
                last_name,
                phone_number,
                email,
                password: hashedPassword,
            });

            try {
                await salesperson.save();
                return salesperson;
            } catch (err) {
                console.error(err);
                return {err};
            }
        },

        addClient: async (
            _,
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
    },
};

module.exports = resolvers;
