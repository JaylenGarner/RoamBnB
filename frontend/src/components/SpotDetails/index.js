import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllSpots } from '../../store/spots'
import { getAllReviews } from '../../store/reviews'
import { NavLink, useHistory } from 'react-router-dom';
import { deleteSpot } from '../../store/spots';
import {useParams} from 'react-router-dom'
import './SpotDetails.css'

function SpotDetails() {
  const dispatch = useDispatch();
  const history = useHistory()

  const { spotId } = useParams();

  const spots = useSelector((state) => state.spots)
  const spot = spots[spotId]

  const reviews = useSelector((state) => state.reviews)

  const sessionUser = useSelector(state => state.session.user);

  useEffect((spotId) => {
    dispatch(getAllSpots());
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
      <span id='spot-detail-name'>{spot.name}</span> <br></br>
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
              <button class='spot-crud-buttons'>Edit This Listing</button>
            </NavLink>
            <button onClick={handleDelete} className='spot-crud-buttons' >Delete This Listing</button>
          </div>
        )}
      </div>
    </div>
  )
 }

export default SpotDetails;
