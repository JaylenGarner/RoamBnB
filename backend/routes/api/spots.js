const express = require('express')
const { Spot } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

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

module.exports = router;
