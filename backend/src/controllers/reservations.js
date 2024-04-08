const Reservation = require('../models/Reservation');

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

  const reservation = await Reservation.create({
    customer_name: customerName,
    customer_email: customerEmail,
    customer_count: customerCount,
    reservation_datetime: reservationDatetime,
  });
  res.status(201).json(reservation);
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
