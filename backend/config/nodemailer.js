const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: process.env.MAILSERVICE,
    auth: {
        user: process.env.MAILUSER,
        pass: process.env.MAILPASSWORD,
    },
});

module.exports = transporter;
