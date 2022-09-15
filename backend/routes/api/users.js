const express = require('express')

const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { User } = require('../../db/models');
const { Spot } = require('../../db/models');
const { Booking } = require('../../db/models');
const { Review } = require('../../db/models');
const { Image } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

const validateSignup = [
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Invalid email'),
  check('firstName')
    .exists({ checkFalsy: true })
    .withMessage('First Name is required'),
  check('lastName')
    .exists({ checkFalsy: true })
    .withMessage('Last Name is required'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
  handleValidationErrors
];

// Sign up
router.post(
  '/',
  validateSignup,
  async (req, res, next) => {
    const { firstName, lastName, email, password } = req.body;

    const checkforEmail = await User.findOne({
      where: {
        email: email
      }
    })

    if (checkforEmail) {

      const err = new Error();
      err.status = 403;
      err.errors = { "email": "User with that email already exists" };
      res.json(
      { message: "User already exists", "statusCode": 403,
       errors: { "email": "User with that email already exists" } })
      return next(err);
    }

    const user = await User.signup({ firstName, lastName, email, password });

    const token = await setTokenCookie(res, user);

    res.status(200)
    return res.json({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      token: token
    });
  }
);

// Get all of the current users bookings
router.get('/:userId/bookings', restoreUser, requireAuth, async (req, res) => {
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
        'id', 'ownerId', 'address', 'city', 'state', 'country', 'lat',
      'lng', 'name', 'price', 'previewImage'
      ]
    }]
  })

  res.json(bookings)
})

// Get all of the current users reviews
router.get('/:userId/reviews', restoreUser, requireAuth, async (req, res) => {
  const { user } = req;
  const reviews = await Review.findAll({
    where: {
      userId: user.id
    },
    attributes: [
      'id', 'userId', 'spotId', 'review', 'stars', 'createdAt', 'updatedAt'
    ],

    include: [
      {
      model: User,
      attributes: [
        'id', 'firstName','lastName'
      ]
    },
    {
      model: Spot,
      attributes: [
        'id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'price'
      ]
    },
    // {
    //   model: Image,
    //   where: {
    //     imageableType: 'review'
    //   },
    //   attributes: [
    //     'id', 'imageableId', 'url'
    //   ]
    // },
  ]
  })

  for (const review of reviews) {

    const resImages = []

    const images = await Image.findAll({ where: {
      imageableId: review.id,
      imageableType: 'review'
     } });

     for (let i = 0; i < images.length; i++) {
      const currImage = images[i]
      let resImage = {
        id: currImage.id,
        imageableId: currImage.imageableId,
        url: currImage.url
      }
      resImages.push(resImage)
     }

    review.dataValues['Images'] = resImages
  }

  res.json({
    Reviews: reviews
  });



  res.json(reviews)
})

module.exports = router;
