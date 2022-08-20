const express = require('express');

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User } = require('../../db/models');
const { Spot } = require('../../db/models');
const { Booking } = require('../../db/models');
const { Image } = require('../../db/models');
const { Review } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

const validateLogin = [
  check('credential')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Please provide a valid email or username.'),
  check('password')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a password.'),
  handleValidationErrors
];

// Log in
router.post(
  '/login',
  validateLogin,
  async (req, res, next) => {
    const { credential, password } = req.body;

    const user = await User.login({ credential, password });

    if (!user) {
      const err = new Error('Login failed');
      err.status = 401;
      err.title = 'Login failed';
      err.errors = ['The provided credentials were invalid.'];
      res.json(
      { "message": "Invalid credentials", "statusCode": 401 })
      return next(err);
    }

    const userInfo = await User.scope('loginUser').findOne({
      where: {
        username: credential
      },
      attributes: {
        id: User.id,
        firstName: User.firstName,
        lastName: User.lastName,
        email: User.email,
      },
    })

    let token = await setTokenCookie(res, user);

    return res.json({
      id: userInfo.id,
      firstName: userInfo.firstName,
      lastName: userInfo.lastName,
      email: userInfo.email,
      token: token
    });
  }
);

// Log out
router.delete(
  '/',
  (_req, res) => {
    res.clearCookie('token');
    return res.json({ message: 'success' });
  }
);

// Get the current user
// Restore session user
// router.get('/',restoreUser,(req, res) => {
//     const { user } = req;
//     if (user) {
//       return res.json({
//         currentUser: {
//         id: user.id,
//         firstName: user.firstName,
//         lastName: user.lastName,
//         email: user.email
//         }
//       });
//     } else return res.json({});
//   }
// );

// Get all spots owned by the current user
router.get('/spots', restoreUser, async (req, res) => {
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
router.get('/bookings', restoreUser, async (req, res) => {
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
router.get('/reviews', restoreUser, async (req, res) => {
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
