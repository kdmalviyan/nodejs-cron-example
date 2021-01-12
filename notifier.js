const nodemailer = require("nodemailer");
let mailTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'email@gmail.com',
        pass: 'password'
    }
});

const sendMail = (message) => {
    mailTransporter.sendMail(message, (err, data) => {
        if (err) {
            console.log('Error Occurs');
        } else {
            console.log('Email sent successfully');
        }
    });
}

module.exports = { sendMail };