import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { deleteBooking, getOneBooking } from '../../store/bookings'
import { useHistory } from 'react-router-dom'
import { getAllReviews } from '../../store/reviews'
import bookingDateFormatter from '../../tools/bookingDateFormatter'
import { createReview } from '../../store/reviews'
import "./BookingPage.css";

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faArrowLeftLong} from '@fortawesome/free-solid-svg-icons'
import {faStar} from '@fortawesome/free-solid-svg-icons'


function BookingPage() {
const dispatch = useDispatch()
const history = useHistory()

const {bookingId} = useParams()
const bookings = useSelector((state) => state.bookings)
const booking = bookings[bookingId]
const user = useSelector((state) => state.session.user)
const reviews = useSelector((state) => state.reviews)

const [stars, setStars] = useState(0)
const [myReview, setMyReview] = useState('')


useEffect(() => {
    dispatch(getOneBooking(bookingId))
  }, [dispatch, bookingId])

  useEffect(() => {
    if (booking) {
      dispatch(getAllReviews(booking.spotId))
    }
  }, [dispatch, booking])

  const handleReview = (e) => {
    e.preventDefault()
    const newReview = { review: myReview, stars: stars};
    console.log(newReview)
    return dispatch(createReview(booking.spotId, newReview))
}


const handleCancelation = (e) => {
    e.preventDefault()
    dispatch(deleteBooking(bookingId))
    history.push(`/trips`)
}


const leaveReview = () => {
   return (
    <div>
    <div id="starContainer" className="star-container">
  <input type="radio" name="rating" id="star5" className="rating-input" onChange={() => setStars(5)} />
  <label htmlFor="star5" className="booking-page-inactive-star">
    <FontAwesomeIcon icon={faStar} />
  </label>
  <input type="radio" name="rating" id="star4" className="rating-input" onChange={() => setStars(4)} />
  <label htmlFor="star4" className="booking-page-inactive-star">
    <FontAwesomeIcon icon={faStar} />
  </label>
  <input type="radio" name="rating" id="star3" className="rating-input" onChange={() => setStars(3)} />
  <label htmlFor="star3" className="booking-page-inactive-star">
    <FontAwesomeIcon icon={faStar} />
  </label>
  <input type="radio" name="rating" id="star2" className="rating-input" onChange={() => setStars(2)} />
  <label htmlFor="star2" className="booking-page-inactive-star">
    <FontAwesomeIcon icon={faStar} />
  </label>
  <input type="radio" name="rating" id="star1" className="rating-input" onChange={() => setStars(1)} />
  <label htmlFor="star1" className="booking-page-inactive-star">
    <FontAwesomeIcon icon={faStar} />
  </label>
</div>
  <textarea
    id="review-text"
    className="booking-page-review-input"
    value={myReview}
    onChange={(e) => setMyReview(e.target.value)}
    placeholder="How was your stay?..."
    rows="5"
  />
  <div className='booking-page-review-button-container'>
  <button className='booking-page-review-button' onClick={(e) => handleReview(e)}>Leave Review</button>
  </div>
</div>
   )
}

const displayReviewStars = (stars) => {
    let difference = 5 - stars;
    let starsArray = [];

    for (let i = 0; i < stars; i++) {
      starsArray.push(
        <span key={i}>
          <FontAwesomeIcon icon={faStar} className='booking-page-existing-gold-star' />
        </span>
      );
    }

    for (let i = 0; i < difference; i++) {
      starsArray.push(
        <span key={i + stars}>
          <FontAwesomeIcon icon={faStar} />
        </span>
      );
    }

    return <div>{starsArray}</div>;
};


const checkForReview = () => {
let userReview;

    Object.values(reviews).forEach((review) => {
        if (review.spotId === booking.spotId && review.userId === user.id) {
            userReview = review
        }
    })

    if (!userReview) {
        return (
            <div>
            {/* There is no review, so empty stars awaiting input will be returned */}
            <div className='booking-page-stars-container'>
            {leaveReview()}
            </div>
            </div>
        )
    } else {
        return (
            <div>
                <span>{userReview.review}</span>
                <div className='booking-page-stars-container'>
                {/* There is a review, so the stars will be statically rendered based off the user's review */}
                {displayReviewStars(userReview.stars)}
                </div>
            </div>
        )
    }
}

if (booking) {

    if (booking.userId !== user.id) {
        history.push('/trips')
    }

    if (booking.Spot && booking.Spot.Owner) {

        const startDate = new Date(booking.startDate)
        const endDate = new Date(booking.endDate)
        const today = new Date();

        const formattedEndDate = bookingDateFormatter(booking.endDate)

        return (
            <div className='booking-page-container'>
                <div className='booking-page-grid'>
                    <div className='booking-info-container'>
                        <img src={booking.Spot.previewImage} className='booking-page-image'></img>
                        <h2 className='booking-page-owner-heading'>Your stay at {booking.Spot.Owner.firstName}'s place</h2>
                        <FontAwesomeIcon icon={faArrowLeftLong} className='booking-page-back-button' onClick={() => history.push('/trips')}></FontAwesomeIcon>
                        <div className='booking-page-dates-container'>
                            <div className='booking-page-check-in'>
                                <span className='booking-page-check-in-text' >Check-in</span>
                                <span>{bookingDateFormatter(booking.startDate)}</span>
                                <span className='booking-page-check-in-time'>4:00 PM</span>
                            </div>
                            <div className='booking-page-check-out'>
                            <span className='booking-page-check-in-text'>Check-out</span>
                            <span>{formattedEndDate}</span>
                                <span className='booking-page-check-in-time'>11:00 AM</span>
                            </div>
                        </div>

                        <div className='booking-page-reservation-details'>
                            <div className='booking-page-reservation-management'>
                            <h2 className='booking-page-reservation-details-text'>Reservation Details</h2>
                            {endDate > today && <button onClick={handleCancelation} className='booking-page-cancel-button'>Cancel Trip</button>}
                            </div>
                            <div className='booking-page-cancelation-policy'>
                                <span className='booking-page-cancelation-policy-header'>Cancelation policy</span>
                                <p className='booking-page-cancelation-policy-text'>Free cancellation before 4:00 PM on {formattedEndDate.slice(4)}</p>
                            </div>
                        </div>

                        <div className='booking-page-host-details'>
                        <h2 >Hosted By {booking.Spot.Owner.firstName}</h2>
                        <div className='booking-page-host-image-container'>
                        <img src={booking.Spot.Owner.image} className='booking-page-host-image' ></img>
                        </div>
                        </div>

                        {endDate < today &&
                        <div className='booking-page-review-area'>
                        <h2>Your Review</h2>
                        {checkForReview()}
                        </div>}
                    </div>

                    <div className='booking-google-maps-area'>
                    </div>
                </div>
            </div>
        )
    } else {
        return <></>
    }

} else {
    return <></>
}
}

export default BookingPage
