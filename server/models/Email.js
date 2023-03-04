const { Schema, model } = require('mongoose');

const emailSchema = new Schema({
    subject: {
        type: String,
    },
    body: {
        type: String,
    },
    date: {
        type: Date,
        required: true,
    },
    sales_person: {
        type: Schema.Types.ObjectId,
        ref: 'Salesperson',
    },
    client: {
        type: Schema.Types.ObjectId,
        ref: 'Client',
    },
    received: {
        type: Boolean,
        required: true,
    },
});

const Email = model('Email', emailSchema);

module.exports = Email;
