const nodemailer = require("nodemailer");

exports.sendEmail = async (subject, content, email) => {
  const transporter = await nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process?.env?.EMAIL,
      pass: process?.env?.PASSWORD,
    },
  });

  const message = {
    from: process?.env?.EMAIL,
    to: email, // list of receivers
    subject: subject, // Subject line
    text: content, // plain text body
    html: `${content}`, // html body
  };

  // send mail with defined transport object
  transporter
    .sendMail(message)
    .then((info) => {
      return info.messageId;
    })
    .catch((err) => {
      return err;
    });
};
