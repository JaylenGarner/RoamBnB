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
  check('email')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Email is required'),
  check('password')
    .exists({ checkFalsy: true })
    .withMessage('Password is required'),
  handleValidationErrors
];

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

// Log in
router.post(
  '/login',
  validateLogin,
  async (req, res, next) => {
    const { email, password } = req.body;

    const user = await User.login({ email, password });

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
        email: email
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

// Sign up
router.post(
  '/signup',
  validateSignup,
  async (req, res) => {
    const { firstName, lastName, username, email, password } = req.body;

    const checkforEmail = await User.findOne({
      where: {
        email: email
      }
    })

    if (checkforEmail) {
      res.json
    }

    if (checkforEmail) {
      res.status(403).send({ "message": "User already exists", "statusCode": 403,
      "errors": { "email": "User with that email already exists" } });
      return
    }

    const user = await User.signup({ firstName, lastName, username, email, password });

    const token = await setTokenCookie(res, user);

    return res.json({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      token: token
    });
  }
);

module.exports = router;
