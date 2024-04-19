const nodemailer = require('nodemailer');

const sendReservationEmail = async (reservationDetails) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD
    }
  });

  const mailOptions = {
    from: process.env.EMAIL_USERNAME,
    to: reservationDetails.customerEmail,
    subject: 'Reservation Confirmation',
    text: `Hello ${reservationDetails.customerName},\n\nYour reservation for ${reservationDetails.customerCount} guests is confirmed on ${reservationDetails.reservationDatetime}.\nYour reservation number is ${reservationDetails.reservationNumber}.\n\nThank you for choosing us!`
  };

  try {
    let info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + info.response);
  } catch (error) {
    console.error('Failed to send email:', error);
  }
};

module.exports = sendReservationEmail;
