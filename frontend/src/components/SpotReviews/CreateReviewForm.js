import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createReview } from '../../store/reviews';
import './SpotReviews.css'
// import { ValidationError } from '../utils/validationError';

const CreateReviewForm = ({spotId}) => {

  // const [errorMessages, setErrorMessages] = useState({});
  const dispatch = useDispatch();
  // const sessionUser = useSelector(state => state.session.user);
  // const history = useHistory();

  const [review, setReview ] = useState('')
  const [stars, setStars ] = useState(0)

  const handleSubmit = async (e) => {
    const newReview = {review, stars};

    return dispatch(createReview(spotId, newReview))
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
