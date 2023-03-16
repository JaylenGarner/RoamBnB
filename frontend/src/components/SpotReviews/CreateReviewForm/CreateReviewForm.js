import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { createReview } from '../../../store/reviews';
import { getOneSpot } from '../../../store/spots';
import { getAllReviews } from '../../../store/reviews';
import './CreateReviewForm.css'

const CreateReviewForm = ({setNewReview}) => {
  const dispatch = useDispatch();

  const {spotId} = useParams()

  const [review, setReview ] = useState('')
  const [stars, setStars ] = useState(0)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newReview = {review, stars};
    dispatch(createReview(spotId, newReview))
    setStars(0);
    setReview('');

    // Re-renders reviews in SpotDetails
    setNewReview(newReview)
  };

  return (
    <div className='create-review-container'>
    <form onSubmit={handleSubmit} className='create-review-form'>
    <h3 className='create-review-header'>How was your stay?</h3>
      <div className='create-review-input-container'>
      <input
        type="text" className='create-review-text-input'
        placeholder='Describe Your Experience...'
        value={review}
        onChange={(e) => setReview(e.target.value)}
      />
      <br></br>
      <input
        type="number" className='create-review-stars'
        value={stars}
        onChange={(e) => setStars(e.target.value)}
      />
      </div>
      <br></br>
    <button type="submit" className='spot-crud-buttons'>Submit</button>
  </form>
  </div>
  )
}

export default CreateReviewForm
