import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllSpots } from '../../store/spots'
import { NavLink } from 'react-router-dom';
import './HomePage.css';
import '../../index.css'



function HomePage() {
  const dispatch = useDispatch();
  // const sessionUser = useSelector(state => state.session.user);
  const spots = useSelector((state) => state.spots)
  const spotsArr = Object.values(spots)
  // if (sessionUser) return (
  // console.log(spots)
  // );

  useEffect(() => {
    dispatch(getAllSpots());
  }, [dispatch]);

  return (
    <div className='home-page-container'>
    <div className='grid-1'>
      {spotsArr.map((spot) => {
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
              <span className='spot-text'>{spot.city}, {spot.state}</span>
              <br></br>
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
