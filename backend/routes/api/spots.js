const express = require('express')
const { Spot } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({message: 'Spot Router Works'})
})

module.exports = router;
