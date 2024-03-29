import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllSpots } from '../../store/spots'
import { NavLink } from 'react-router-dom';
import {useParams} from 'react-router-dom'
import './HomePage.css';
import '../../index.css'

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faStar} from '@fortawesome/free-solid-svg-icons'

function HomePage() {
  const dispatch = useDispatch();
  const spots = useSelector((state) => state.spots)

  // The presense of a user id will make the home page component only render spots owner by that user
  const { userId } = useParams()

  const starsTool = (spot) => {
    if (spot.avgStarRating) {
      return <span>
        <FontAwesomeIcon icon={faStar}></FontAwesomeIcon>
        &nbsp;
        {spot.avgStarRating}
        </span>
    } else {
      return 'No Reviews'
    }
  }

  const star = <FontAwesomeIcon icon={faStar}></FontAwesomeIcon>

  useEffect(() => {
    dispatch(getAllSpots());
  }, [dispatch]);

  const filteredSpots = Object.values(spots).filter(
    (spot) => !userId || spot.ownerId === Number(userId)
  );

  console.log(filteredSpots)

  return (
    <div className='home-page-container'>
    <div className='grid-1'>
      {filteredSpots.map((spot) => {
        if (!spot) {
          return null
        } else {
        return (
          <div  key={spot.id} className='home-spot-container'>
            <NavLink to={`/${spot.id}`} className='spot-nav-links'>
              <div className='preview-image' style={{
                backgroundImage:`url(${spot.previewImage})`
              }}></div>
              <div className='spot-details'>
                <div className='spot-price-and-stars'>
                  <span className='spot-text'>{spot.city}, {spot.state}</span>
                  {/* <span className='star-icon'>★</span> */}

                  <span className='spot-avg-stars'>
                  {starsTool(spot)}
                  </span>
                </div>
                <span>${spot.price} </span>
                <span className='night'>night</span>
              </div>
            </NavLink>
          </div>
          )}}
        )}
    </div>
    </div>
  );
}

export default HomePage;
