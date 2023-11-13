require('dotenv').config({ path: __dirname + '/../../.env' });
const nodemailer = require('nodemailer');

const sendEmail = async (email, subject, text) => {
  // Set up nodemailer transport (using a service like Gmail, Outlook, etc.)
  let transporter = nodemailer.createTransport({
    // Example with Gmail; replace with your email service details
    service: 'gmail',
    auth: {
      user:  process.env.MFA_EMAIL,
      pass:  process.env.MFA_PASSWORD,
    },
  });

  // Email options
  let mailOptions = {
    from: 'userauth909@gmail.com',
    to: email,
    subject: subject,
    text: text,
  };

  // Send the email
  await transporter.sendMail(mailOptions);
};

module.exports = { sendEmail };
