const express = require('express')
const { Review } = require('../../db/models');
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

// Edit a review
router.put('/:reviewId', restoreUser, requireAuth, async (req, res) => {
  const { user } = req;
  const { reviewId } = req.params;
  const { review, stars} = req.body;

  const reviewToEdit = await Review.findByPk(reviewId)

  if (!reviewToEdit) {
    res.status(404).send({ "message": "Review couldn't be found", "statusCode": 404 });
    return
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

module.exports = router;
