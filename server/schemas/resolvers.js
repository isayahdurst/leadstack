const { Client, Salesperson } = require("../models");

const resolvers = {
    Query: {
        clients: async () => {
            return Client.find({}).populate("sales_person");
        },
        clientsBySalesperson: async (parent, args) => {
            const salesperson = await Salesperson.findById(args.salespersonId);
            if (!salesperson) {
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
};

module.exports = resolvers;
