const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.GMAIL_EMAIL, // generated ethereal user
    pass: process.env.GMAIL_PASSWORD, // generated ethereal password
  },
});

transporter
  .verify()
  .then(() => console.log("Listo para enviar correos"))
  .catch(console.error);

module.exports = transporter;
