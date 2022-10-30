import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllSpots } from '../../store/spots'
import { useHistory } from 'react-router-dom';
import { getAllReviews } from '../../store/reviews';



function SpotReviews({reviewsArr}) {
  const sessionUser = useSelector(state => state.session.user);

  const reviews = useSelector((state) => state.reviews)

  if (!reviews) {
    return null
  }

  return (
    <div>
      {reviewsArr.map((review) => {
        return <h3 key={review.id}>{review.review}</h3>
      })}
    </div>
  );
}

export default SpotReviews;
