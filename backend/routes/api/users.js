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
  check('image')
    .exists({ checkFalsy: true })
    .withMessage('Please enter a valid image URL'),
  handleValidationErrors
];

// Sign up
router.post(
  '/',
  validateSignup,
  async (req, res, next) => {
    const { firstName, lastName, email, password, image } = req.body;

    const checkforEmail = await User.findOne({
      where: {
        email: email
      }
    })

    if (checkforEmail) {

      res.status(403).send({ "message": "User already exists", "statusCode": 403,
      errors: { "email": "User with that email already exists" }
      });

      return
    }

    const user = await User.signup({ firstName, lastName, email, password, image });
    const token = await setTokenCookie(res, user);

    res.status(200)
    return res.json({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      image: user.image,
      token: token
    });
  }
);


module.exports = router;
