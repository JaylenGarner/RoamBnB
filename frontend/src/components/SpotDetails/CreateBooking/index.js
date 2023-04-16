import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { createBooking } from '../../../store/bookings';
import { getAllSpotBookings } from '../../../store/bookings';
import './CreateBooking.css';

const CreateBooking = ({ reviewCount, avgRating }) => {
  const dispatch = useDispatch();
  const { spotId } = useParams();
  const spot = useSelector((state) => state.spots[spotId]);
  const bookings = useSelector((state) => state.bookings)
  const user = useSelector((state) => state.session.user);

  const [spotBookings, setSpotBookings] = useState([]);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingId, setBookingId] = useState(null);

  const [errors, setErrors] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    let currentErrors = [];

    if (user.id === spot.ownerId) {
      currentErrors.push("You can't create a booking for your own spot");
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    const today = new Date();
    if (start < today || end < today) {
      currentErrors.push("Booking dates must be in the future");
    }

    if (start >= end) {
      currentErrors.push("Start date must be before the end date");
    }

    // compare start and end dates with existing bookings
    for (let i = 0; i < spotBookings.length; i++) {
      let currBooking = spotBookings[i];
      let currStartDate = new Date(currBooking.startDate);
      let currEndDate = new Date(currBooking.endDate);

      if ((start >= currStartDate && start <= currEndDate) ||
          (end >= currStartDate && end <= currEndDate) ||
          (currStartDate >= start && currStartDate <= end)) {
        currentErrors.push("Dates conflict with an existing booking");
        break;
      }
    }

    if (currentErrors.length > 0) {
      setErrors(currentErrors);
    } else {
      const newBooking = await dispatch(createBooking(startDate, endDate, spot.id));
      setErrors([]);
      setBookingSuccess(true);
      return newBooking;
    }
  };

  const star = <FontAwesomeIcon icon={faStar} className="review-star" />;

  useEffect(() => {
    if (bookings) {
        const bookingArr = [];

        Object.values(bookings).forEach((booking) => {
            if (booking.spotId == spotId) {
                bookingArr.push(booking)
            }
        })

        setSpotBookings(bookingArr)
      }
  }, [dispatch, spotId])

console.log(bookingId)
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
            <div className='booking-error'>
                <span key={index}>{error}</span>
            </div>
          ))}
        </div>
      )}
      {bookingSuccess ? (
        <div className='booking-created'>
          Your trip is booked!
        </div>
      ) : (
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
      )}
    </div>
  );
};

export default CreateBooking;
