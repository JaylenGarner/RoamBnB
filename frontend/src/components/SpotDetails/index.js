import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllSpots } from '../../store/spots'
import { getAllReviews } from '../../store/reviews'
import { NavLink, useHistory } from 'react-router-dom';
import { deleteSpot } from '../../store/spots';
import {useParams} from 'react-router-dom'
import SpotReviews from '../SpotReviews';
import CreateReviewForm from '../SpotReviews/CreateReviewForm';
import {getOneSpot} from '../../store/spots'
import './SpotDetails.css'

function SpotDetails() {
  const dispatch = useDispatch();
  const history = useHistory()

  const { spotId } = useParams();
  const spot = useSelector((state) => state.spots.spot)

  const reviews = useSelector((state) => state.reviews)
  const reviewsArr = Object.values(reviews)

  const sessionUser = useSelector(state => state.session.user);

  useEffect(() => {
    // dispatch(getAllSpots());
    dispatch(getOneSpot(spotId))
    dispatch(getAllReviews(spotId))
  }, [dispatch]);

  if (!spot) {
    return null
  }

  const handleDelete = (e) => {
    return dispatch(deleteSpot(spot.id)).then(async (res) => {
      history.push(`/`)
    })
  }

  return (
    <div className='spot-detail-container'>
      <div className='spot-detail-panel'>
      <span id='spot-detail-name'>{spot.name} hosted by {spot.Owner.firstName}</span> <br></br>
      <span id='spot-detail-location'>{spot.city}, {spot.state}, {spot.country}</span>
      <img src={spot.previewImage} className='spot-detail-image'></img>
      <span id='spot-detail-description'> {spot.description}</span> <br></br>
      <div className='spot-detail-price-container'>
      <span id='spot-detail-price'>${spot.price} </span>
      <span id='spot-detail-night'>night</span>
      </div>
        {(sessionUser) && (sessionUser.id === spot.ownerId) &&
          (<div id='spot-details-buttons'>
            <NavLink to={`/${spotId}/edit`}>
              <button className='spot-crud-buttons'>Edit This Listing</button>
            </NavLink>
            <button onClick={handleDelete} className='spot-crud-buttons' >Delete This Listing</button>
          </div>
        )}
        <br></br>
        <div className='reviews-container'>
        <SpotReviews spotId={spot.id}/>
        </div>


        {(sessionUser) && (sessionUser.id !== spot.ownerId) && (
        <div className='create-review-container'>
        <CreateReviewForm spotId={spot.id}/>
        </div>
        )}

      </div>
    </div>
  )
 }

export default SpotDetails;
