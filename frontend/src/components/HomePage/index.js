import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllSpots } from '../../store/spots'
import { NavLink } from 'react-router-dom';



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
    <div className='home-page'>
      {spotsArr.map((spot) => {
        return (
          <div className='preview-image' key={spot.id}>
            <NavLink to={`/${spot.id}`}>
            <img src={spot.previewImage} className='preview-image'></img>
            </NavLink>
          </div>
        )
      })}
    </div>
  );
}

export default HomePage;
