import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { createBooking } from '../../../store/bookings';
import './CreateBooking.css';

const CreateBooking = ({ reviewCount, avgRating }) => {
  const dispatch = useDispatch();
  const { spotId } = useParams();
  const spot = useSelector((state) => state.spots[spotId]);
  const user = useSelector((state) => state.session.user);

  const [errors, setErrors] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    let currentErrors = [];

    if (user.id === spot.ownerId) {
      currentErrors.push("You can't create a booking for your own spot");
    }

    const result = await dispatch(createBooking(startDate, endDate, spot.id));

    if (!result.success) {
      currentErrors = [...currentErrors, result.error];
    } else {
      const newBooking = result.booking;
      return newBooking;
    }

    setErrors(currentErrors);
    console.log(errors)
  };

  const star = <FontAwesomeIcon icon={faStar} className="review-star" />;

  return (
    <div className="create-booking-panel">
      <div className="booking-panel-review-info-container">
        <div className="spot-detail-price-container">
          <span id="spot-detail-price">${spot.price} </span>
          <span id="spot-detail-night">night</span>
        </div>
        <div>
          <span className="create-booking-star">{star}</span>
          <span className="spot-detail-rating">
            {' '}
            {avgRating} ·{' '}
          </span>
          <span className="spot-detail-review-count">
            {reviewCount} reviews
          </span>
        </div>
      </div>
      {errors.length > 0 && (
        <div>
          {errors.map((error, index) => (
            <span key={index}>{error}</span>
          ))}
        </div>
      )}
      <div className="create-booking-form-container">
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="create-booking-date-fields-container">
            <div className="create-booking-checkin-container">
              <span>CHECK-IN</span>
              <input
                type="date"
                className="date-input"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required
              />
            </div>
            <div className="create-booking-checkin-container create-booking-checkout-container">
              <span>CHECK OUT</span>
              <input
                type="date"
                className="date-input"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="create-booking-submit-button-container">
            <button type="submit" className="create-booking-button">
              Reserve
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateBooking;
