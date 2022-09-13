const express = require('express')
const { Booking, Spot } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { restoreUser, requireAuth } = require('../../utils/auth')

const router = express.Router();

// Create a booking

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

// Delete a Booking
router.delete('/:bookingId', restoreUser, requireAuth, async (req, res) => {
  const { user } = req;
  const { bookingId } = req.params;
  const userId = user.id;

  // const booking = await Booking.findByPk(bookingId)
  const booking = await Booking.findOne({where: { id: bookingId },
    attributes: ['id', 'userId']
  })

  if (!booking) {
    res.status(404).send({ "message": "Booking couldn't be found", "statusCode": 404 });
    return
  }

    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();
    today = yyyy + '-' + mm + '-' + dd;

    if (booking.startDate <= today) {
      res.status(400).send({ "message": "Bookings that have been started can't be deleted",
      "statusCode": 404 });
      return
    }

  const spot = await Spot.findByPk(booking.spotId)

  if (booking.userId === userId || spot.ownerId === userId) {
    await booking.destroy()
    return res.json({ "message": "Successfully deleted", "statusCode": 200 })
  }

  res.json({message: "This is not your booking or spot"})
})

module.exports = router;
