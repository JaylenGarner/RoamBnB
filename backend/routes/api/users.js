const express = require('express')

const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { User } = require('../../db/models');
const { Spot } = require('../../db/models');
const { Booking } = require('../../db/models');
const { Review } = require('../../db/models');
const { Image } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
// const { requireAuth } = require('../../utils/auth')

const router = express.Router();

const validateSignup = [
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Please provide a valid email.'),
  check('username')
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage('Please provide a username with at least 4 characters.'),
  check('username')
    .not()
    .isEmail()
    .withMessage('Username cannot be an email.'),
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
  async (req, res) => {
    const { email, password, username } = req.body;
    const user = await User.signup({ email, username, password });

    await setTokenCookie(res, user);

    return res.json({
      user,
    });
  }
);

// Get current user
router.get('/:userId',restoreUser, requireAuth,(req, res) => {
  const { userId } = req.params
  const { user } = req;
  if (user.id == userId) {

    return res.json({
      currentUser: {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email
      }});
  } else return res.json({});
});

// Get all spots owned by the current user
router.get('/:userId/spots', restoreUser, requireAuth, async (req, res) => {
  const { user } = req;
  const spots = await Spot.findAll({
    where: {
      ownerId: user.id
    },
    attributes: [
      'id', 'ownerId', 'address', 'city', 'state', 'country','lat', 'lng',
      'name', 'description','price', 'createdAt', 'updatedAt', 'previewImage'
    ]
  })

  res.json(spots)
})

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
    {
      model: Image,
      where: {
        imageableType: 'review'
      },
      attributes: [
        'id', 'imageableId', 'url'
      ]
    },
  ]
  })

  res.json(reviews)
})

module.exports = router;
