const mg = require('./mailGunSetup'); // Import the Mailgun client

const sendReservationEmail = async (reservationDetails) => {
  const emailData = {
    from: "Your Service <mailgun@sandbox0907f3643a8543fca55577302c53a831.mailgun.org>",  // Customize your "from" address
    to: [reservationDetails.customerEmail],  // Set the recipient email address
    subject: "Reservation Confirmation",
    text: `Hello ${reservationDetails.customerName},
           Your reservation for ${reservationDetails.customerCount} guests is confirmed on ${reservationDetails.reservationDatetime}.
           Your reservation number is ${reservationDetails.reservationId}.
           Thank you for choosing us!`,
    html: `<h1>Reservation Confirmation</h1>
           <p>Hello ${reservationDetails.customerName},</p>
           <p>Your reservation for ${reservationDetails.customerCount} guests is confirmed on ${reservationDetails.reservationDatetime}.</p>
           <p>Your reservation number is ${reservationDetails.reservationId}.</p>
           <p>Thank you for choosing us!</p>`
  };

  try {
    const response = await mg.messages.create('mailgun@sandbox0907f3643a8543fca55577302c53a831.mailgun.org', emailData);  // Replace 'your-mailgun-domain.com' with your actual Mailgun domain
    console.log('Email sent:', response);
  } catch (error) {
    console.error('Failed to send email:', error);
  }
};

module.exports = { sendReservationEmail };