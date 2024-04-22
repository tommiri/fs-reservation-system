const Reservation = require('../models/Reservation');
const sendReservationEmail = require('../utility/mailer');

const getReservations = async (_req, res) => {
  const reservations = await Reservation.findAll();
  if (!reservations.length) {
    return res.status(404).json({ error: 'No reservations found' });
  }
  res.json(reservations);
};

const getReservation = async (req, res) => {
  const { reservationId } = req.params;
  const reservation = await Reservation.findByPk(reservationId);
  if (!reservation) {
    return res.status(404).json({ error: 'Reservation not found' });
  }
  res.json(reservation);
};

const createReservation = async (req, res) => {
  const {
    customer_name,
    customer_email,
    customer_count,
    reservation_datetime,
  } = req.body;

  try {
    const reservation = await Reservation.create({
      customer_name,
      customer_email,
      customer_count,
      reservation_datetime,
    });

    // Get the generated reservation number
    const reservation_number =
      reservation.dataValues.reservation_number;

    // Prepare details for sending email
    const reservationDetails = {
      reservation_number,
      customer_name,
      customer_email,
      customer_count,
      reservation_datetime,
    };

    // Send confirmation email
    await sendReservationEmail(reservationDetails);

    res.status(201).json(reservation);
  } catch (error) {
    console.error('Failed to create reservation:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const updateReservation = async (req, res) => {
  const { reservationId } = req.params;
  const {
    customer_name,
    customer_email,
    customer_count,
    reservation_datetime,
  } = req.body;

  const reservation = await Reservation.findByPk(reservationId);
  if (!reservation) {
    return res.status(404).json({ error: 'Reservation not found' });
  }

  await reservation.update({
    customer_name,
    customer_email,
    customer_count,
    reservation_datetime,
  });

  res.json(reservation);
};

const deleteReservation = async (req, res) => {
  const { reservationId } = req.params;
  const reservation = await Reservation.findByPk(reservationId);
  if (!reservation) {
    return res.status(404).json({ error: 'Reservation not found' });
  }
  await reservation.destroy();
  res.status(204).end();
};

module.exports = {
  getReservations,
  getReservation,
  createReservation,
  updateReservation,
  deleteReservation,
};
