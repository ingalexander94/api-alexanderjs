const transporter = require("./config");

const sendEmailWithHTML = async (from, to, subject, html) => {
  await transporter.sendMail({
    from,
    to,
    subject,
    html,
  });
};

const sendEmailWithText = async (from, to, subject, text) => {
  await transporter.sendMail({
    from,
    to,
    subject,
    text,
  });
};

module.exports = {
  sendEmailWithHTML,
  sendEmailWithText,
};
