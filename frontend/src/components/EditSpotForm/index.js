import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

import { getOneSpot } from '../../store/spots';
import { editSpot } from '../../store/spots';
import './EditSpotForm.css'
// import { ValidationError } from '../utils/validationError';

const EditSpotForm = () => {
  const history = useHistory();
  const sessionUser = useSelector(state => state.session.user);
  if (!sessionUser) history.push(`/`)


  const { spotId } = useParams()
  const spot = useSelector((state) => state.spots.spot)

  // const [errorMessages, setErrorMessages] = useState({});
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(getOneSpot(spotId))
  }, [dispatch]);

  // if (!spot) {
  //   return null
  // }

  const [address, setAddress] = useState(spot.address);
  const [city, setCity] = useState(spot.city);
  const [state, setState] = useState(spot.state);
  const [country, setCountry] = useState(spot.country);
  const [lat, setLat] = useState(spot.lat);
  const [lng, setLng] = useState(spot.lng);
  const [name, setName] = useState(spot.name);
  const [description, setDescription] = useState(spot.description);
  const [price, setPrice] = useState(spot.price);
  const [previewImage, setPreviewImage] = useState(spot.previewImage)

  const handleSubmit = async (e) => {
    e.preventDefault();

    //!!START SILENT
    const editedSpot = { address, city, state, country, lat, lng, name, description, price, previewImage };
    return dispatch(editSpot(editedSpot, spotId)).then(async (res) => {
      history.push(`/${res.id}`)
    })
  }

    return (
      <div className='edit-spot-container'>
      <div className='edit-spot-panel'>
        <div className='edit-spot-label'>
          <h2>Edit Your Listing</h2>
        </div>
      <form onSubmit={handleSubmit} className='edit-spot-form'>
        <h3 id='welcome'>Edit Your Listing</h3>
        <ul>
          {/* {errors.map((error, idx) => <li key={idx}>{error}</li>)} */}
        </ul>
        <input
            type="text" className='edit-spot-fields' placeholder={address}
            value={address} required
            onChange={(e) => setAddress(e.target.value)}
          />
          <input
            type="text" className='edit-spot-fields' placeholder='City'
            value={city} required
            onChange={(e) => setCity(e.target.value)}
          />
          <input
            type="text" className='edit-spot-fields' placeholder='State'
            value={state} required
            onChange={(e) => setState(e.target.value)}
          />
           <input
            type="text" className='edit-spot-fields' placeholder='Country'
            value={country} required
            onChange={(e) => setCountry(e.target.value)}
          />
           <input
            type="text" className='edit-spot-fields' placeholder='Latitude'
            value={lat} required
            onChange={(e) => setLat(e.target.value)}
            />
          <input
            type="text" className='edit-spot-fields' placeholder='Longitude'
            value={lng}
            onChange={(e) => setLng(e.target.value)} required
          />
          <input
            type="text" className='edit-spot-fields' placeholder='Name'
            value={name} required
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text" className='edit-spot-fields' placeholder='Description'
            value={description} required
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            type="text" className='edit-spot-fields' placeholder='Price'
            value={price} required
            onChange={(e) => setPrice(e.target.value)}
          />
          <input
            type="text" className='edit-spot-fields' placeholder='Preview Image (URL)'
            value={previewImage} required
            onChange={(e) => setPreviewImage(e.target.value)}
          />
        <button type="submit" className='edit-spot-button'>Submit</button>
      </form>
      </div>
      </div>
    );
}

export default EditSpotForm
