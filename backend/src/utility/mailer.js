const nodemailer = require('nodemailer');
require('dotenv').config();

const sendReservationEmail = async (reservationDetails) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_APP_PASSWORD,
    },
  });

  // Format ISO time to Finnish time
  const formattedDateTime = new Date(
    reservationDetails.reservation_datetime
  ).toLocaleString('en-FI');

  const mailOptions = {
    from: process.env.EMAIL_USERNAME,
    to: reservationDetails.customer_email,
    subject: 'Reservation Confirmation',
    text: `Hello ${reservationDetails.customer_name},\n\nYour reservation for ${reservationDetails.customer_count} guests is confirmed on ${formattedDateTime}.\nYour reservation number is ${reservationDetails.reservation_number}.\n\nThank you for choosing us!`,
    html: `<h1>Your reservation at SomeCoolDiner</h1> <p>Hello ${reservationDetails.customer_name},</p><p>Your reservation for ${reservationDetails.customer_count} guests is confirmed on ${formattedDateTime}.</p><p>Your reservation number is ${reservationDetails.reservation_number}.</p><p>Thank you for choosing us!</p>`,
  };

  try {
    let info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + info.response);
  } catch (error) {
    console.error('Failed to send email:', error);
  }
};

module.exports = sendReservationEmail;
