const express = require('express')
const { Booking, Spot, User } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { restoreUser, requireAuth } = require('../../utils/auth')

const router = express.Router();


// Delete a Booking
router.delete('/:bookingId', restoreUser, requireAuth, async (req, res) => {
  const { user } = req;
  const { bookingId } = req.params;
  const userId = user.id;

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

// Get all of the current users bookings
router.get('/current', restoreUser, requireAuth, async (req, res) => {
  const { user } = req;
  const bookings = await Booking.findAll({
    where: {
      userId: user.id
    },
    attributes: [
      'id', 'spotId', 'userId', 'startDate', 'endDate', 'createdAt', 'updatedAt'
    ],

    include: [
      {
      model: Spot,
      attributes: [
        'id', 'ownerId', 'address', 'city', 'state', 'country', 'name', 'price', 'previewImage'
      ]
    },
    {
      model: User,
      attributes: [
        'id', 'firstName'
      ]
    }]
  })

  res.json(bookings)
})

// Get booking by id

router.get('/:bookingId', restoreUser, requireAuth, async (req, res) => {
  const { bookingId } = req.params;
  const booking = await Booking.findByPk(bookingId, {
    attributes: [
      'id', 'spotId', 'userId', 'startDate', 'endDate', 'createdAt', 'updatedAt'
    ],
    include: [
      {
        model: Spot,
        attributes: [
          'id', 'ownerId', 'address', 'city', 'state', 'country', 'name', 'price', 'previewImage'
        ],
        include: [
          {
            model: User,
            as: 'Owner',
            attributes: [
              'id', 'firstName', 'image'
            ]
          }
        ]
      }
    ]
  });

  if (!booking) {
    res.status(404).send({ "message": "Booking couldn't be found", "statusCode": 404 });
    return
  }

  return res.json({
    id: booking.id,
    spotId: booking.spotId,
    userId: booking.userId,
    startDate: booking.startDate,
    endDate: booking.endDate,
    createdAt: booking.createdAt,
    updatedAt: booking.updatedAt,
    Spot: booking.Spot
  })
})

// Edit a booking based on the Booking Id
router.put('/:bookingId', restoreUser, requireAuth, async (req, res) => {
  const { user } = req;
  const { bookingId } = req.params;
  const { startDate, endDate } = req.body;
  const booking = await Booking.findOne({
    where: {
      id :bookingId
    },
    attributes: ['id', 'spotId', 'userId', 'startDate', 'endDate', 'createdAt', 'updatedAt']
  })

  if (!booking) {
    res.status(404).send({ "message": "Booking couldn't be found", "statusCode": 404 });
    return
  }

    if (startDate >= booking.startDate && startDate <= booking.endDate){
      return res.json({message: "booking conflict"})
    }

    if (endDate >= booking.startDate && endDate <= booking.endDate){
      return res.json({message: "booking conflict"})
    }

    if (booking.startDate >= startDate && booking.startDate <= endDate) {
      return res.json({message: "booking conflict"})
    }

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
    createdAt: booking.createdAt,
    updatedAt: booking.updatedAt
  })
})

module.exports = router;
