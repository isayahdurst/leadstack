const nodemailer = require('nodemailer');

useEmail = async ({ from, to, subject, text, auth }) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            ...auth,
        },
    });

    const mailOptions = {
        from: from,
        to: to,
        subject: subject,
        text: text,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + info.response);
    } catch (err) {
        console.error(err);
    }
};

module.exports = useEmail;
