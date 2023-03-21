import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

import { getOneSpot } from '../../store/spots';
import { editSpot } from '../../store/spots';
import './EditSpotForm.css'

const EditSpotForm = () => {
  const history = useHistory();
  const sessionUser = useSelector(state => state.session.user);
  if (!sessionUser) history.push(`/`)

  const { spotId } = useParams()
  const spots = useSelector((state) => state.spots)

  // const [errorMessages, setErrorMessages] = useState({});
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(getOneSpot(spotId))
  }, [dispatch]);


  const spot = spots[spotId]

  const [address, setAddress] = useState(spot?.address);
  const [city, setCity] = useState(spot?.city);
  const [state, setState] = useState(spot?.state);
  const [country, setCountry] = useState(spot?.country);
  const [name, setName] = useState(spot?.name);
  const [description, setDescription] = useState(spot?.description);
  const [price, setPrice] = useState(spot?.price);
  const [previewImage, setPreviewImage] = useState(spot?.previewImage)

  // Grab IDs to target the images on the backend for updating
  const [image1Id, setImage1Id] = useState()
  const [image2Id, setImage2Id] = useState()

  const [image1, setImage1] = useState()
  const [image2, setImage2] = useState()

  useEffect(() => {

    dispatch(getOneSpot(spotId))

    console.log(spot?.Images)

    if (spot?.Images[0] && spot?.Images[1]) {
      setImage1Id(spot.Images[0].id)
      setImage1(spot.Images[0].url)
      setImage2Id(spot.Images[1].id)
      setImage2(spot.Images[1].url)
    } else if (spot?.Images[0] && !spot?.Images[1]) {
      setImage1Id(spot.Images[0].id)
      setImage1(spot.Images[0].url)
    } else if (!spot?.Images[0] && spot?.Images[1]) {
      setImage1Id(spot.Images[1].id)
      setImage1(spot.Images[1].url)
    }

  }, [dispatch]);


  const handleSubmit = async (e) => {
    e.preventDefault();

    //!!START SILENT
    const editedSpot = { address, city, state, country, name, description, price, previewImage, image1Id, image1, image2Id, image2 };
    return dispatch(editSpot(editedSpot, spotId)).then(async (res) => {
      history.push(`/${res.id}`)
    })
  }

  if (!spots || !spots[spotId]) {
    return null
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
            type="text" className='edit-spot-fields' placeholder='Address'
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
           <input
            type="text" className='edit-spot-fields' placeholder='Add Image'
            value={image1}
            onChange={(e) => setImage1(e.target.value)}
          />
           <input
            type="text" className='edit-spot-fields' placeholder='Add Image'
            value={image2}
            onChange={(e) => setImage2(e.target.value)}
          />
        <button type="submit" className='edit-spot-button'>Submit</button>
      </form>
      </div>
      </div>
    );
}

export default EditSpotForm
