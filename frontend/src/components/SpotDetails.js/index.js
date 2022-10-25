import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllSpots, getOneSpot } from '../../store/spots'
import {useParams} from 'react-router-dom'



function SpotDetails() {
  const { spotId } = useParams()
  // const sessionUser = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const spots = useSelector((state) => state.spots)
  const spot = {...spots[spotId]}

  // if (sessionUser) return (

  // );

  useEffect(() => {
    dispatch(getAllSpots());
  }, [dispatch, spotId]);

  return (
    <div>
    <img src={spot.previewImage}></img>
    <h3>{spot.city}</h3>
    <h3>{spot.price}</h3>
    </div>
  );
}

export default SpotDetails;
