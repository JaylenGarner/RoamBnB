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

  const updateAddress = (e) => setAddress(e.target.value);
  const updateCity = (e) => setCity(e.target.value);
  const updateState = (e) => setState(e.target.value);
  const updateCountry = (e) => setCountry(e.target.value);
  const updateLat = (e) => setLat(e.target.value);
  const updateLng = (e) => setLng(e.target.value);
  const updateName = (e) => setName(e.target.value);
  const updateDescription = (e) => setDescription(e.target.value);
  const updatePrice = (e) => setPrice(e.target.value)

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newSpot = { address, city, state, country, lat, lng, name, description, price };


    return dispatch(createSpot(newSpot)).then(async (res) => {
      history.push(`/${res.id}`)
    })
  };

    return (
      <div className='login-panel'>
        <div className='login-form-label'>
          <h2>Become an AirBnB Host</h2>
        </div>
      <form onSubmit={handleSubmit} className='login-form'>
        <h3 id='welcome'>Get started</h3>
        <ul>
          {/* {errors.map((error, idx) => <li key={idx}>{error}</li>)} */}
        </ul>
          <input
            type="text"
            className='login-text-fields'
            placeholder='Address'
            value={address}
            onChange={(e) => updateAddress(e)}
            required
          />
          <input
            type="text"
            className='login-text-fields'
            placeholder='City'
            value={city}
            onChange={(e) => updateCity(e)}
            required
          />
          <input
            type="text"
            className='login-text-fields'
            placeholder='State'
            value={state}
            onChange={(e) => updateState(e)}
            required
          />
           <input
            type="text"
            className='login-text-fields'
            placeholder='Country'
            value={country}
            onChange={(e) => updateCountry(e)}
            required
          />
           <input
            type="text"
            className='login-text-fields'
            placeholder='Latitude'
            value={lat}
            onChange={(e) => updateLat(e)}
            required
          />
          <input
            type="text"
            className='login-text-fields'
            placeholder='Longitude'
            value={lng}
            onChange={(e) => updateLng(e)}
            required
          />
          <input
            type="text"
            className='login-text-fields'
            placeholder='Name'
            value={name}
            onChange={(e) => updateName(e)}
            required
          />
          <input
            type="text"
            className='login-text-fields'
            placeholder='Description'
            value={description}
            onChange={(e) => updateDescription(e)}
            required
          />
          <input
            type="text"
            className='login-text-fields'
            placeholder='Price'
            value={price}
            onChange={(e) => updatePrice(e)}
            required
          />
        <button type="submit">Submit</button>
      </form>
      </div>
    );
}

export default CreateSpotForm
