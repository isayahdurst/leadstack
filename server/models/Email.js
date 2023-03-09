const { Schema, model } = require('mongoose');
const nodemailer = require('nodemailer');

const emailSchema = new Schema({
    subject: {
        type: String,
    },
    text: {
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
});

const Email = model('Email', emailSchema);

module.exports = Email;
