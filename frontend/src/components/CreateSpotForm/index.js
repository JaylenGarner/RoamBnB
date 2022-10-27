import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createSpot } from '../../store/spots';
// import { ValidationError } from '../utils/validationError';

const CreateSpotForm = () => {

  // const [errorMessages, setErrorMessages] = useState({});
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const history = useHistory();
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [previewImage, setPreviewImage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newSpot = { address, city, state, country, lat, lng, name, description, price, previewImage };

    return dispatch(createSpot(newSpot)).then(async (res) => {
      history.push(`/${res.id}`)
    })
  };

    return (
      <div className='login-panel'>
        <div className='login-form-label'>
          <h2>Create Your Listing</h2>
        </div>
      <form onSubmit={handleSubmit} className='login-form'>
        <h3 id='welcome'>Get started</h3>
        <ul>
          {/* {errors.map((error, idx) => <li key={idx}>{error}</li>)} */}
        </ul>
          <input
            type="text" className='login-text-fields' placeholder='Address'
            value={address} required
            onChange={(e) => setAddress(e.target.value)}
          />
          <input
            type="text" className='login-text-fields' placeholder='City'
            value={city} required
            onChange={(e) => setCity(e.target.value)}
          />
          <input
            type="text" className='login-text-fields' placeholder='State'
            value={state} required
            onChange={(e) => setState(e.target.value)}
          />
           <input
            type="text" className='login-text-fields' placeholder='Country'
            value={country} required
            onChange={(e) => setCountry(e.target.value)}
          />
           <input
            type="text" className='login-text-fields' placeholder='Latitude'
            value={lat} required
            onChange={(e) => setLat(e.target.value)}
            />
          <input
            type="text" className='login-text-fields' placeholder='Longitude'
            value={lng}
            onChange={(e) => setLng(e.target.value)} required
          />
          <input
            type="text" className='login-text-fields' placeholder='Name'
            value={name} required
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text" className='login-text-fields' placeholder='Description'
            value={description} required
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            type="text" className='login-text-fields' placeholder='Price'
            value={price} required
            onChange={(e) => setPrice(e.target.value)}
          />
          <input
            type="text" className='login-text-fields' placeholder='Preview Image (URL)'
            value={previewImage} required
            onChange={(e) => setPreviewImage(e.target.value)}
          />
        <button type="submit">Submit</button>
      </form>
      </div>
    );
}

export default CreateSpotForm
