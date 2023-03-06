const { Schema, model } = require('mongoose');
const nodemailer = require('nodemailer');

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

emailSchema.methods.sendEmail = async function () {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: '',
            pass: '',
        },
    });

    const mailOptions = {
        from: this.sales_person.email,
        to: this.client.email,
        subject: this.subject,
        text: this.body,
    };

    try {
        const result = await transporter.sendMail(mailOptions);
        console.log(result);
        return 'Email sent successfully';
    } catch (err) {
        console.error(err);
        return null;
    }
};

const Email = model('Email', emailSchema);

module.exports = Email;
