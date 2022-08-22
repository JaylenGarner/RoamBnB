const express = require('express')
const sequelize = require('sequelize');
const { Spot } = require('../../db/models');
const { Image } = require('../../db/models');
const { User } = require('../../db/models');
const { Review } = require('../../db/models');
const { Booking } = require('../../db/models');
const { restoreUser, requireAuth } = require('../../utils/auth')

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

// Get All Spots
router.get('/', async (req, res) => {
  const spots = await Spot.findAll({
    attributes: [
      'id', 'ownerId', 'address', 'city', 'state', 'country',
      'lat','lng', 'name', 'description', 'price',
      'createdAt', 'updatedAt', 'previewImage'
    ]
  })

  return res.json(spots);
})

// Get Details Of a Spot From An Id
router.get('/:spotId', async (req, res) => {
  const { spotId } = req.params

  const isValidSpot = await Spot.findByPk(spotId)

  if (!isValidSpot) {
    res.status(404).send({ "message": "Spot couldn't be found", "statusCode": 404 });
    return
  }

  const spot = await Spot.findOne({
    where: { id : spotId },

    attributes: [
      'id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name',
      'description', 'price', 'createdAt', 'updatedAt',
       [sequelize.fn("COUNT", sequelize.col("Reviews.id")), "numReviews"], 'avgStarRating'
    ],

    group: ['Spot.id','Images.id', 'Owner.id'],

    include: [
      {
      model: Image,
      where: {
        imageableId: spotId,
        imageableType: 'spot'
      },
      attributes: [
        'id', 'imageableId', 'url'
      ]
    },
    {
    model: User,
    as: 'Owner',
    attributes: [
      'id', 'firstName', 'lastName'
    ]
  },
  {
    model: Review,
    where: {
      spotId: spotId
    },
    attributes: []
  }],
})

return res.json(spot);

})

// Get All Reviews By a Spot's ID
router.get('/:spotId/reviews', async (req, res) => {
  const { spotId } = req.params

  const isValidSpot = await Spot.findByPk(spotId)

  if (!isValidSpot) {
    res.status(404).send({ "message": "Spot couldn't be found", "statusCode": 404 });
    return
  }

  const spot = await Spot.findByPk(spotId)
  const reviews = await spot.getReviews({
    attributes: [
      'id', 'userId', 'spotId', 'review', 'stars', 'createdAt', 'updatedAt'
    ],

    include: [
      {
      model: User,
      attributes: [
        'id', 'firstName', 'lastName'
      ]
    },
    {
      model: Image,
      where: {
        imageableId: spotId,
        imageableType: 'review'
      },
      attributes: [
        'id', 'imageableId', 'url'
      ]
    }],
  })

  return res.json(reviews)
})

// Get All Bookings By a Spot's ID
router.get('/:spotId/bookings', restoreUser, requireAuth, async (req, res) => {
  const { spotId } = req.params;
  const { user } = req;

  const isValidSpot = await Spot.findByPk(spotId)

  if (!isValidSpot) {
    res.status(404).send({ "message": "Spot couldn't be found", "statusCode": 404 });
    return
  }

  const spot = await Spot.findByPk(spotId)

  // If you are the owner
  if (user.id == spot.ownerId) {
    const ownerBookings = await Booking.findAll({
      where: {
        spotId: spotId
      },
      attributes: [
        'id', 'spotId', 'userId', 'startDate', 'endDate', 'createdAt', 'updatedAt'
      ],
      include: {
        model: User,
        attributes: [
          'id', 'firstName', 'lastName'
        ]
      }
    })

    return res.json(ownerBookings);

  } else {

    // If you are not the owner
    const bookings = await Booking.findAll({
      where: {
        spotId: spotId
      }
    })

    return res.json(bookings)
  }
})

// Create a spot
router.post('/', restoreUser, requireAuth, async (req, res) => {
  const { user } = req;
  const { address, city, state, country, lat, lng, name, description, price } = req.body;

  const spot = await Spot.create({
    ownerId: user.id,
    address: address,
    city: city,
    state: state,
    country: country,
    lat: lat,
    lng: lng,
    name: name,
    description: description,
    price: price
  })

  return res.json({
    id: spot.id,
    ownerId: spot.ownerId,
    address: spot.address,
    city: spot.city,
    state: spot.state,
    country: spot.country,
    lat: spot.lat,
    lng: spot.lng,
    name: spot.name,
    description: spot.description,
    price: spot.price,
    createdAt: spot.createdAt,
    updatedAt: spot.updatedAt
  })
})

module.exports = router;
