const express = require('express')
const sequelize = require('sequelize');
const { Spot } = require('../../db/models');
const { Image } = require('../../db/models');
const { User } = require('../../db/models');
const { Review } = require('../../db/models');

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
      [sequelize.fn("COUNT", sequelize.col("Reviews.id")), "numReviews"], 'avgStarRating'
    ],

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

return res.json(spot)

})

module.exports = router;
