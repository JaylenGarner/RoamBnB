const express = require('express')
const { Review, Image } = require('../../db/models');
const { restoreUser, requireAuth } = require('../../utils/auth')

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

// Get all Reviews ***TESTING PURPOSES***
router.get('/', async (req, res) => {
  const reviews = await Review.findAll()
  res.json(reviews)
})

// Get a review ***TESTING PURPOSES***
router.get('/:reviewId', async (req, res) => {
  const { reviewId } = req.params
  const review = await Review.findByPk(reviewId)
  res.json(review)
})

const validateReview = [
  check('review')
    .exists({ checkFalsy: true })
    .withMessage('Review text is required'),
  check('stars')
    .exists({ checkFalsy: true })
    .isFloat({min: 1, max: 5})
    .withMessage('Stars must be an integer from 1 to 5'),
  handleValidationErrors
];


// Edit a review
router.put('/:reviewId', restoreUser, requireAuth, validateReview, async (req, res) => {
  const { user } = req;
  const { reviewId } = req.params;
  const { review, stars} = req.body;

  const reviewToEdit = await Review.findByPk(reviewId)

  if (!reviewToEdit) {
    const err = new Error();
      err.status = 404;
      res.json({ message: "Review couldn't be found", "statusCode": 404})
      return next(err);
  }

  if (reviewToEdit.userId === user.id) {
    await reviewToEdit.update({
        review: review,
        stars: stars
    })

    await reviewToEdit.save();

    return res.json(reviewToEdit)
  }

  res.json({message: "This is not your review"})
})

// Delete a review
router.delete('/:reviewId', restoreUser, requireAuth, async (req, res) => {
  const { user } = req;
  const { reviewId } = req.params;

  const review = await Review.findByPk(reviewId)

  if (!review) {
    res.status(404).send({ "message": "Review couldn't be found", "statusCode": 404 });
    return
  }

  if (review.userId === user.id) {
    await review.destroy()
    return res.json({ "message": "Successfully deleted", "statusCode": 200 })
  }

  res.json({message: "This is not your review"})
})

// Add an image to a review based on the review's id
router.post('/:reviewId/images', restoreUser, requireAuth, async (req, res) => {
  const { user } = req;
  const { reviewId } = req.params;
  const { url } = req.body;
  const review = await Review.findByPk(reviewId)

  if (!review) {
    res.status(404).send({ "message": "Review couldn't be found", "statusCode": 404 });
    return
  }

  const allImages = await review.getImages({
    attributes: ['id', 'imageableId', 'imageableType']
  })

  if (allImages.length >= 10) {
    res.status(404).send({ "message": "Maximum number of images for this resource was reached", "statusCode": 400 });
    return
  }

  if (review.userId === user.id) {

    const image = await Image.create({
      imageableId: reviewId,
      imageableType: 'review',
      url: url,
    })

    return res.json({
      id: image.id,
      imageableId: reviewId,
      url: image.url
    })
  }

  return res.json({message: "This is not your review"})
})

module.exports = router;
