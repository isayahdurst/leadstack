const { Schema, model } = require("mongoose");

const smsSchema = new Schema({
    date: {
        type: Date,
        required: true,
    },
    body: {
        type: String,
    },
    sales_person: {
        type: Schema.Types.ObjectId,
        ref: "Salesperson",
    },
    client: {
        type: Schema.Types.ObjectId,
        ref: "Client",
    },
    received: {
        type: Boolean,
        required: true,
    },
});

const Sms = model("Sms", smsSchema);

module.exports = Sms;
