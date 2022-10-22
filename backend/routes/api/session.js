const express = require('express');

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
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
    .withMessage('Email is required'),
  check('password')
    .exists({ checkFalsy: true })
    .withMessage('Password is required'),
  handleValidationErrors
];

// // Log in
router.post(
  '/',
  validateLogin,
  async (req, res, next) => {
    const { password } = req.body;
    const email = req.body.credential

    const user = await User.login({ email, password });

    if (!user) {
      res.status(401).send({ "message": "Invalid credentials", "statusCode": 401 });
      return
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

// Get current user
router.get('/',restoreUser,(req, res) => {
  const { user } = req;
  if (user) {
  let currentUser = {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email
  }

    return res.json(
      currentUser
    );
  } else return res.json({});
});


// Log out
router.delete(
  '/',
  (_req, res) => {
    res.clearCookie('token');
    return res.json({ message: 'success' });
  }
);



module.exports = router;
