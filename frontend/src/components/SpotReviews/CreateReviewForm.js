import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createReview } from '../../store/reviews';
// import { ValidationError } from '../utils/validationError';

const CreateReviewForm = ({spotId}) => {

  // const [errorMessages, setErrorMessages] = useState({});
  const dispatch = useDispatch();
  // const sessionUser = useSelector(state => state.session.user);
  // const history = useHistory();

  const [review, setReview ] = useState('')
  const [stars, setStars ] = useState(0)

  const handleSubmit = async (e) => {
    // e.preventDefault();
    const newReview = {review, stars};

    return dispatch(createReview(spotId, newReview))
  };

  return (
    <>
    <h1>Leave a review</h1>
    <form onSubmit={handleSubmit} className='create-review-form'>
      <input
        type="textarea" className='create-review-textarea'
        placeholder='Describe Your Experience...'
        value={review} required
        onChange={(e) => setReview(e.target.value)}
      />
      <br></br>
      <input
        type="number" className='create-review-stars'
        value={stars}
        onChange={(e) => setStars(e.target.value)}
      />
    <button type="submit" className='create-spot-button'>Submit</button>
  </form>
  </>
  )
}

export default CreateReviewForm
