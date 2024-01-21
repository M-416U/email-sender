const nodemailer = require("nodemailer");
const HTML_TEMPLATE = require("./mail-template");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "aldhamrimedia",
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.AUTH_EMAIL,
    pass: process.env.AUTH_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
});
const SENDMAIL = async (mailDetails, callback) => {
  try {
    const info = await transporter.sendMail({
      ...mailDetails,
      text: mailDetails.body,
      html: HTML_TEMPLATE(mailDetails.body, mailDetails.subject),
    });
    console.log("INFO: ", info);
    callback(info);
  } catch (error) {
    if (error.code === "ETIMEDOUT") {
      return console.error(
        "Connection timed out. Retry or check network and server."
      );
    }
    console.error(error);
    throw error;
  }
};
module.exports = SENDMAIL;
