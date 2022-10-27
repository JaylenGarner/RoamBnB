import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllSpots } from '../../store/spots'
import { NavLink } from 'react-router-dom';
import './HomePage.css';



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
    <div className='grid-1'>
      {spotsArr.map((spot) => {
        return (
          <div  key={spot.id} className='spot-container'>
            <NavLink to={`/${spot.id}`}>
              <img src={spot.previewImage} className='preview-image'></img>
              <div className='spot-details'>
              <span>{spot.city}, {spot.state}</span>
              <span>${spot.price} night</span>
              </div>
            </NavLink>
          </div>
        )
      })}
    </div>
  );
}

export default HomePage;
