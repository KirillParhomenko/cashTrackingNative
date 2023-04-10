const nodemailer = require("nodemailer");
require("dotenv").config();

class EmailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  }

  sendMail = async (to, link) => {
    await this.transporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject: `Активация аккаунта на ${
        process.env.API_URL + process.env.PORT
      }`,
      text: "",
      html: `
        <button><a href="${
          process.env.API_URL + process.env.PORT + "/api/activate/" + link
        }">Активировать</a></button>
      `,
    });
  };
}

module.exports = new EmailService();
