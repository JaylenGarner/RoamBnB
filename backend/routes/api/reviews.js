const express = require('express')
const { Review } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

router.get('/', async (req, res) => {
  return res.json({message: 'Review Router Works'})
})

module.exports = router;
