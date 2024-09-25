

// const express = require('express');
// const nodemailer = require('nodemailer');
// const bodyParser = require('body-parser');
// const cors = require('cors');

// const app = express();
// app.use(bodyParser.json());
// app.use(cors());

// // Nodemailer transporter configuration
// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: 'schedyy@gmail.com', // Your Gmail address
//     pass: 'schedy24barilan', // Your Gmail password or App Password (for 2FA)
//   },
// });

// // Middleware to handle the email sending
// const sendEmail = (req, res) => {
//   const { pdfBase64, toEmail } = req.body;

//   const mailOptions = {
//     from: 'schedyy@gmail.com', // Full email address of the sender
//     to: toEmail, // Recipient's email address
//     subject: 'Schedy Weekly Shifts PDF',
//     text: 'Please find the attached PDF for the weekly shift.',
//     attachments: [
//       {
//         filename: 'Schedy-shifts.pdf',
//         content: pdfBase64.split('base64,')[1], // Extract base64 content
//         encoding: 'base64',
//       },
//     ],
//   };

//   transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//       return res.status(500).send(error.toString());
//     }
//     res.status(200).send('Email sent: ' + info.response);
//   });
// };

// module.exports = sendEmail;

const nodemailer = require('nodemailer');

// Nodemailer transporter configuration
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // true for 465, false for other ports

  auth: {
    user: 'schedyy@gmail.com', // Your Gmail address
    pass: 'dlcx goqp kdle lxod', // Replace with your Gmail App Password
  },
});

// Middleware to handle the email sending
const sendEmail = (req, res) => {
  const { pdfBase64, toEmail, message } = req.body;

  const mailOptions = {
    from: 'schedyy@gmail.com', // Full email address of the sender
    to: toEmail, // Recipient's email address
    subject: 'Schedy Weekly Shifts PDF',
    text: `${message}\n\nThanks, \nSchedy Team`, 
    attachments: [
      {
        filename: 'Schedy-shifts.pdf',
        content: pdfBase64.split('base64,')[1], // Extract base64 content
        encoding: 'base64',
      },
    ],
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error sending email:', error);
      return res.status(500).send('Error sending email: ' + error.toString());
    }
    console.log('Email sent: ' + info.response);
    res.status(200).send('Email sent: ' + info.response);
  });
};

module.exports = sendEmail;
