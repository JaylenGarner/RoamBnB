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
  const spots = useSelector((state) => state.spots)

  const reviews = useSelector((state) => state.reviews)
  const reviewsArr = Object.values(reviews)
  const [newReview, setNewReview] = useState('')

  const sessionUser = useSelector(state => state.session.user);

  // When a review is created, this will run and setNewReview, whcub will allow the useEffect to render new reviews
  const reviewRenderTool = (res) => setNewReview(res)

  useEffect(() => {
    dispatch(getOneSpot(spotId))
    dispatch(getAllReviews(spotId))
  }, [dispatch, spotId, newReview]);


  const handleDelete = (e) => {
    return dispatch(deleteSpot(spotId)).then(async (res) => {
      history.push(`/`)
    })
  }

  if (!spots || !spots[spotId]) {
    return <></>
  } else {
  const spot = spots[spotId]

  if (spot.Owner) {
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
        <SpotReviews spotId={spotId}/>
        </div>

        {(sessionUser) && (sessionUser.id !== spot.ownerId) && (
        <div className='create-review-container'>
        <CreateReviewForm setNewReview={setNewReview}/>
        </div>
        )}
      </div>
    </div>
  )
}

}

 }

export default SpotDetails;
