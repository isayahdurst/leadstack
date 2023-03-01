const { Schema, model } = require("mongoose");

const clientSchema = new Schema({
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true,
    },
    phone_number: {
        type: String,
    },
    email: {
        type: String,
    },
    sales_person: {
        type: Schema.Types.ObjectId,
        ref: "Salesperson",
    },
    status: {
        type: String,
        required: true,
    },
});

const Client = model("Client", clientSchema);

module.exports = Client;
