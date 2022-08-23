const express = require('express')
const { Image, Spot, Review } = require('../../db/models');
const { restoreUser, requireAuth } = require('../../utils/auth')
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

// Get all images ***TESTING PURPOSES***
router.get('/', async (req, res) => {
  const images = await Image.findAll()
  res.json(images)
})

// Get an image ***TESTING PURPOSES***
router.get('/:imageId', async (req, res) => {
  const { imageId } = req.params
  const image = await Image.findByPk(imageId)

  res.json(image)
})

// Delete an image
router.delete('/:imageId', restoreUser, requireAuth, async (req, res) => {
  const { user } = req;
  const { imageId } = req.params;
  const image = await Image.findByPk(imageId);

  if (!image) {
    res.status(404).send({ "message": "Image couldn't be found", "statusCode": 404 });
    return
  }

  const imageableId = image.imageableId;
  const imageableType = image.imageableType;

  const success = { "message": "Successfully deleted", "statusCode": 200 }

  // If user owns the image (review)
  if (imageableType === 'spot') {
    const spot = await Spot.findByPk(imageableId)

    if (spot.ownerId == user.id) {
      await image.destroy();
      res.json(success)
    }
  }
  // If user owns the image (spot)
  if (imageableType === 'review') {
    const review = await Review.findByPk(imageableId)

    if (review.userId == user.id) {
      await image.destroy();
      res.json(success)
    }
  }

  return res.json({message: 'This is not your image'})
})






module.exports = router;
