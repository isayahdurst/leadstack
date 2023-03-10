const nodemailer = require('nodemailer');

useEmail = async ({ from, to, subject, text, html, auth }) => {
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
        html: html,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + info.response);
    } catch (err) {
        console.error(err);
    }
};

module.exports = useEmail;
