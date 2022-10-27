import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllSpots } from '../../store/spots'



function TestComp() {
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
return <div className='preview-image' key={spot.id}>
          <img src={spot.previewImage} className='preview-image'></img>
        </div>
      })}
    </div>
  );
}

export default TestComp;
