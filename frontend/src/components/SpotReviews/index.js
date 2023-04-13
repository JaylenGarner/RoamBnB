import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteReview } from '../../store/reviews';
import { useParams } from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faStar} from '@fortawesome/free-solid-svg-icons'
import {getMonth} from '../../tools/dateConverter.js'
import {getYear} from '../../tools/dateConverter.js'
import { getOneSpot } from '../../store/spots';
import { getAllReviews } from '../../store/reviews';


import './SpotReviews.css'

function SpotReviews({setReviewCount, setAvgRating}) {
  const dispatch = useDispatch()
  const sessionUser = useSelector(state => state.session.user);
  const { spotId } = useParams()
  const spots = useSelector((state) => state.spots)
  const spot = spots[spotId]
  const reviews = useSelector((state) => state.reviews)


  const star = <FontAwesomeIcon icon={faStar} className='review-star'></FontAwesomeIcon>

  const twoDecimalPlaces = (avgRating) => {
    setAvgRating(avgRating.toFixed(2))
    return avgRating.toFixed(2)
  }

  const reviewCounter = () => {
    let sum = 0;
    Object.values(reviews).forEach((review) => {
      if (review.spotId == spotId) sum++
    })

    setReviewCount(sum)
    return sum;
  }

  const reviewsHeader = () => {
    const count = reviewCounter()
    if (count < 1) {
      return <h3 className='reviews-header'>No Reviews</h3>
    } else {
      if (spot && spot.avgStarRating) {
      return (
        <h3 className='reviews-header'>
        {star} {twoDecimalPlaces(spot.avgStarRating)} · {count} reviews
        </h3>
        )
      }
    }
  }

  if (!reviews) {
    return null
  } else {

  return (

    <div className='reviews-panel'>
      {reviewsHeader()}
      <br></br>
      <div className='reviews-grid'>
      {Object.values(reviews).map((review) => {
        if (review && review.User && review.spotId == spotId) {
        return (
          <div className='review' key={review.id}>
            <span className='review-name'>{review.User.firstName} {review.User.lastName}</span>
            <br></br>
            <span className='review-date'>{getMonth(review.createdAt)} {getYear(review.createdAt)}</span>
            <br></br>
            <span key={review.id} className='review-body'>{review.review}</span>
          </div>
        )}
        })}
      </div>
    </div>
  );
  }
}

export default SpotReviews;
