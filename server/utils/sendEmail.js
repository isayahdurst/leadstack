const nodemailer = require('nodemailer');

sendEmail = async (salesPerson, client, subject, body) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: '',
            pass: '',
        },
    });

    const mailOptions = {
        from: salesPerson.email,
        to: client.email,
        subject: subject,
        text: body,
    };
};
