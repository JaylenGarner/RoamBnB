const express = require('express')
const { Booking } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { restoreUser, requireAuth } = require('../../utils/auth')

const router = express.Router();

// Edit a booking for a spot based on the Spot's Id
router.put('/:bookingId', restoreUser, requireAuth, async (req, res) => {
  const { user } = req;
  const { startDate, endDate } = req.body;
  const { bookingId } = req.params

  const booking = await Booking.findByPk(bookingId)

  if (!booking) {
    res.status(404).send({ "message": "Booking couldn't be found", "statusCode": 404 });
    return
  }

  if (booking.userId === user.id) {
    await booking.update({
        startDate: startDate,
        endDate: endDate
    })

    await booking.save();

    return res.json({
      id: booking.id,
      spotId: booking.spotId,
      userId: booking.userId,
      startDate: booking.startDate,
      endDate: booking.endDate,
      updatedAt: spot.updatedAt,
      createdAt: booking.createdAt
    })
  }

  res.json({message: "This is not your booking"})
})

module.exports = router;
