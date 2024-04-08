const { Router } = require('express');
const {
  getReservations,
  getReservation,
  createReservation,
  updateReservation,
  deleteReservation,
} = require('../controllers/reservations');

const router = Router();

router.get('/', getReservations);
router.get('/:reservationId', getReservation);

router.post('/', createReservation);

router.put('/:reservationId', updateReservation);

router.delete('/:reservationId', deleteReservation);

module.exports = router;
