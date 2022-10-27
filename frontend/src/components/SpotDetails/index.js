import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllSpots } from '../../store/spots'
import { NavLink, useHistory } from 'react-router-dom';
import { deleteSpot } from '../../store/spots';
import {useParams} from 'react-router-dom'



function SpotDetails() {
  const dispatch = useDispatch();
  const history = useHistory()

  const spots = useSelector((state) => state.spots)

  const { spotId } = useParams()
  const spot = spots[spotId]
  console.log(spot)
  // const sessionUser = useSelector(state => state.session.user);

  // console.log(spots)

  useEffect(() => {
    dispatch(getAllSpots());
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
    <div>
      <img src={spot.previewImage}></img>
      <h3>{spot.city}</h3>
      <h3>{spot.price}</h3>
      <NavLink to={`/${spotId}/edit`}>Edit This Listing</NavLink>
      <button onClick={handleDelete} >Delete Spot</button>
    </div>
  )
 }

export default SpotDetails;
