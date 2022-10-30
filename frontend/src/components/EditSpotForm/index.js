import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

import { getAllSpots } from '../../store/spots';
import { editSpot } from '../../store/spots';
import './EditSpotForm.css'
// import { ValidationError } from '../utils/validationError';

const EditSpotForm = () => {
  const { spotId } = useParams()
  // const [errorMessages, setErrorMessages] = useState({});
  const dispatch = useDispatch();

  const spots = useSelector((state) => state.spots)
  const targetSpot = spots[spotId]

  useEffect(() => {
    dispatch(getAllSpots());
  }, [dispatch, spotId]);

  const sessionUser = useSelector(state => state.session.user);
  const history = useHistory();
  const [address, setAddress] = useState(targetSpot.address);
  const [city, setCity] = useState(targetSpot.city);
  const [state, setState] = useState(targetSpot.state);
  const [country, setCountry] = useState(targetSpot.country);
  const [lat, setLat] = useState(targetSpot.lat);
  const [lng, setLng] = useState(targetSpot.lng);
  const [name, setName] = useState(targetSpot.name);
  const [description, setDescription] = useState(targetSpot.description);
  const [price, setPrice] = useState(targetSpot.price);
  const [previewImage, setPreviewImage] = useState(targetSpot.previewImage)

  // const sessionUser = useSelector(state => state.session.user);

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
