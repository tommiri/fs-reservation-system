const Reservation = require('../models/Reservation');
// const { sendReservationEmail } = require('../utility/emailService');

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
    customerName,
    customerEmail,
    customerCount,
    reservationDatetime,
  } = req.body;

  try {
    const reservation = await Reservation.create({
      customer_name: customerName,
      customer_email: customerEmail,
      customer_count: customerCount,
      reservation_datetime: reservationDatetime,
    });

    // Prepare details for sending email
    const reservationDetails = {
      customerName: customerName,
      customerEmail: customerEmail,
      customerCount: customerCount,
      reservationDatetime: reservationDatetime,
      reservationId: reservation.id, // Assuming ID is returned from the creation
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
    customerName,
    customerEmail,
    customerCount,
    reservationDatetime,
  } = req.body;
  const reservation = await Reservation.findByPk(reservationId);
  if (!reservation) {
    return res.status(404).json({ error: 'Reservation not found' });
  }
  await reservation.update({
    customer_name: customerName,
    customer_email: customerEmail,
    customer_count: customerCount,
    reservation_datetime: reservationDatetime,
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
