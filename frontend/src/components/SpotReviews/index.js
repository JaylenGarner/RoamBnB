import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllSpots } from '../../store/spots'
import { deleteReview } from '../../store/reviews';
import { useHistory } from 'react-router-dom';
import { getAllReviews } from '../../store/reviews';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faStar} from '@fortawesome/free-solid-svg-icons'

import {getMonth} from '../../tools/dateConverter.js'
import {getYear} from '../../tools/dateConverter.js'

import './SpotReviews.css'

function SpotReviews({spotId}) {
  const sessionUser = useSelector(state => state.session.user);

  const spotReviews = []
  const reviews = useSelector((state) => state.reviews)
  const reviewsArr = Object.values(reviews)

  reviewsArr.forEach((review) => {
    if (review.spotId === spotId) spotReviews.push(review)
  })

  const spot = useSelector((state) => state.spots.spot)

  const dispatch = useDispatch()

  useEffect(() => {

  }, [spotReviews]);

  if (!spotReviews) {
    return null
  }

  const star = <FontAwesomeIcon icon={faStar} className='review-star'></FontAwesomeIcon>

  const twoDecimalPlaces = (avgRating) => {
    return avgRating.toFixed(2)
  }

  const handleDelete = (id)  => {
    return dispatch(deleteReview(id))
  }

  const reviewsHeader = () => {
    if (!spotReviews.length) {
      return <h3 className='reviews-header'>No Reviews</h3>
    } else {
      return (<h3 className='reviews-header'>
        {star} {twoDecimalPlaces(spot.avgStarRating)} · {spotReviews.length} reviews
        </h3>)
    }
  }

  return (
    <div className='reviews-panel'>
      {reviewsHeader()}
      <br></br>
      <div className='reviews-grid'>
      {spotReviews.map((review) => {
        console.log(review)
        return (
          <div className='review' key={review.id}>
            <span className='review-name'>{review.User.firstName} {review.User.lastName}</span>
            <br></br>
            <span className='review-date'>{getMonth(review.createdAt)} {getYear(review.createdAt)}</span>
            <br></br>
            <span key={review.id} className='review-body'>{review.review}</span>
            <div className='delete-review-button-container'>

            {(sessionUser.id === review.userId) && (
            <button onClick={(e) => handleDelete(review.id)} className='review-delete-button'>Delete</button>
            )}

            </div>
          </div>
        )
      })}
      </div>
    </div>
  );
}

export default SpotReviews;
