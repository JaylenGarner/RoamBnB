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
       [sequelize.fn("COUNT", sequelize.col("Reviews.id")), "numReviews"],
       [sequelize.fn("AVG", sequelize.col("Reviews.stars")), "avgStarRating"]
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
router.get('/:spotId/reviews', async (req, res, next) => {
  // deconstruct spotId
  const { spotId } = req.params;

  const spot = await Spot.findByPk(spotId)

  if (!spot) {
    res.status(404).send({ "message": "Spot couldn't be found", "statusCode": 404 });
    return
  }

  // get reviews
  const reviews = await Review.findAll({
    where: {
      spotId
    },
    include: [
      {
        model: User,
        attributes: [
          'id', 'firstName', 'lastName'
        ]
      }
    ]
  });


  for (const review of reviews) {

    const resImages = []

    const images = await Image.findAll({ where: {
      imageableId: review.id,
      imageableType: 'review'
     } });

     for (let i = 0; i < images.length; i++) {
      resImages.push(images[i])
     }

    // for each image in found images
    // images.map(image => {
    //   // push all its attribute into here
    //   const currentImage = {
    //     ...image.dataValues
    //   };
    //   reviewImages.push(currentImage);
    // });

    // review.dataValues['Images'] = reviewImages;

    review.dataValues['Images'] = resImages
  }

  res.json({
    Reviews: reviews
  });
});


// Get All Bookings By a Spot's ID
router.get('/:spotId/bookings', restoreUser, requireAuth, async (req, res) => {
  const { spotId } = req.params;
  const { user } = req;

  const spot = await Spot.findByPk(spotId)

  if (!spot) {
    res.status(404).send({ "message": "Spot couldn't be found", "statusCode": 404 });
    return
  }

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

const validateSpot = [
  check('address')
    .exists({ checkFalsy: true })
    .withMessage('Street address is required'),
  check('city')
    .exists({ checkFalsy: true })
    .withMessage('City is required'),
  check('state')
    .exists({ checkFalsy: true })
    .withMessage('State is required'),
  check('country')
    .exists({ checkFalsy: true })
    .withMessage('Country is required'),
  check('lat')
    .exists({ checkFalsy: true })
    .withMessage('Latitude is not valid'),
  check('lng')
    .exists({ checkFalsy: true })
    .withMessage('Longitude is not valid'),
  check('name')
    .exists({ checkFalsy: true })
    .withMessage('Name must be less than 50 characters'),
  check('name')
    .isLength({ max: 50 })
    .withMessage('Name must be less than 50 characters'),
  // check if description is valid
  check('description')
    .exists({ checkFalsy: true })
    .withMessage('Description is required'),
  // check if price is valid
  check('price')
    .exists({ checkFalsy: true })
    .withMessage('Price per day is required'),
  handleValidationErrors
];

const validateReview = [
  check('review')
    .exists({ checkFalsy: true })
    .withMessage('Review text is required'),
  check('stars')
    .exists({ checkFalsy: true })
    .isFloat({min: 1, max: 5})
    .withMessage('Stars must be an integer from 1 to 5'),
  handleValidationErrors
];

// Create a spot
router.post('/', restoreUser, requireAuth, validateSpot, async (req, res) => {
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

// Delete a spot
router.delete('/:spotId', restoreUser, requireAuth, async (req, res) => {
  const { spotId } = req.params;
  const { user } = req;

  const spot = await Spot.findByPk(spotId)

  if (!spot) {
    res.status(404).send({ "message": "Spot couldn't be found", "statusCode": 404 });
    return
  }

  if (spot.ownerId === user.id) {
    await spot.destroy()
    res.json({ "message": "Successfully deleted", "statusCode": 200 })
  }

  return res.json({message: "Authorization error: You are not the spot owner"})
})

// Edit a spot
router.put('/:spotId', restoreUser, requireAuth, validateSpot, async (req, res) => {
  const { user } = req;
  const { spotId } = req.params;
  const { address, city, state, country, lat, lng, name, description, price } = req.body;
  const spot = await Spot.findByPk(spotId)

  if (!spot) {
    res.status(404).send({ "message": "Spot couldn't be found", "statusCode": 404 });
    return
  }

  if (spot.ownerId === user.id) {
    await spot.update({
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

    await spot.save();

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
  }

  res.json({message: "You are not the owner"})
})

// Add an image to a spot based on the Spot's Id
router.post('/:spotId/images', restoreUser, requireAuth, async (req, res) => {
  const { user } = req;
  const { spotId } = req.params;
  const { url } = req.body;
  const spot = await Spot.findByPk(spotId)

  if (!spot) {
    res.status(404).send({ "message": "Spot couldn't be found", "statusCode": 404 });
    return
  }

  if (spot.ownerId === user.id) {

  const image = await Image.create({
    url: url,
    imageableId: spotId,
    imageableType: 'spot'
  })

  return res.json({
    id: image.id,
    imageableId: image.imageableId,
    imageableType: image.imageableType
  })
}

res.json({message: "You don't own this spot"})
})

// Create a review for a spot based on the Spot's Id
router.post('/:spotId/reviews', restoreUser, requireAuth, validateReview, async (req, res) => {
  const { user } = req;
  const { spotId } = req.params;
  const { review, stars } = req.body;
  const spot = await Spot.findByPk(spotId)

  if (!spot) {
    res.status(404).send({ "message": "Spot couldn't be found", "statusCode": 404 });
    return
  }

  const hasReview = await Review.findOne({
    where: {
      userId: user.id,
      spotId: spotId
    }
  })

  if (hasReview) {
    res.status(403).send({ "message": "User already has a review for this spot",
    "statusCode": 403 });
    return
  }

  if (spot.ownerId !== user.id) {

    const newReview = await Review.create({
      userId: user.id,
      spotId: spotId,
      review: review,
      stars: stars
    })

    return res.json({
      id: newReview.id,
      userId: newReview.userId,
      spotId: newReview.spotId,
      review: newReview.review,
      stars: newReview.stars,
      createdAt: newReview.createdAt,
      updatedAt: newReview.updatedAt
    })
  }

  return res.json({message: "You can't review your own spot"})
})

// Create a booking for a spot based on the Spot's Id
router.get('/:spotId/bookings/test', restoreUser, requireAuth, async (req, res) => {
  const { user } = req;
  const { spotId } = req.params;
  const { startDate, endDate } = req.body;
  const spot = await Spot.findByPk(spotId)

  if (!spot) {
    res.status(404).send({ "message": "Spot couldn't be found", "statusCode": 404 });
    return
  }

  const allBookings = await Booking.findAll({
    where: {
      spotId: spotId
    }
  })

  // conflictChecker = (array) => {
  //   for (let i = 0; i < allBookings.length; i++) {
  //     const booking = allBookings[0];

  //     if ((booking.startDate <= startDate && booking.endDate >= endDate)
  //     || (booking.startDate >= startDate && booking.endDate )) {

  //     }
  //   }
  // }

  if (spot.ownerId !== user.id) {

    conflictChecker(allBookings)

    const newBooking = await Booking.create({
      userId: user.id,
      spotId: spotId,
      startDate: startDate,
      endDate: endDate
    })

    return res.json({
      id: newBooking.id,
      spotId: newBooking.spotId,
      userId: newBooking.userId,
      startDate: newBooking.startDate,
      endDate: newBooking.endDate,
      createdAt: newBooking.createdAt,
      updatedAt: newBooking.updatedAt
    })
  }

  return res.json({message: "You can't create a booking for your own spot"})
})

// Add query filters to get spots
// router.get('/', async (req, res) => {
//   let { page, size, minLat, maxLat, mixLng, maxLng, minPrice, maxPrice } = req.query;
//   let where = {}
//   let pagination = {}

//   if (size < 0 || !size) size = 20;
//   if (size > 20) size = 20;

//   if (page < 0 || !page) page = 10;
//   if (page > 10) page = 10;

//   pagination.limit = size;
//   pagination.offset = size * (page - 1);

// })



module.exports = router;
