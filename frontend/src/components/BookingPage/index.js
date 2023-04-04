import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { deleteBooking, getOneBooking } from '../../store/bookings'
import { useHistory } from 'react-router-dom'
import { getAllReviews } from '../../store/reviews'
import bookingDateFormatter from '../../tools/bookingDateFormatter'
import "./BookingPage.css";

function BookingPage() {
const dispatch = useDispatch()
const history = useHistory()

const {bookingId} = useParams()
const bookings = useSelector((state) => state.bookings)
const booking = bookings[bookingId]
const user = useSelector((state) => state.session.user)
const reviews = useSelector((state) => state.reviews)


useEffect(() => {
    dispatch(getOneBooking(bookingId))
  }, [dispatch, bookingId])

  useEffect(() => {
    if (booking) {
      dispatch(getAllReviews(booking.spotId))
    }
  }, [dispatch, booking])


const handleCancelation = (e) => {
    e.preventDefault()
    dispatch(deleteBooking(bookingId))
    history.push(`/trips`)
}

    const checkForReview = () => {
    let userReview;

    Object.values(reviews).forEach((review) => {
        if (review.spotId === booking.spotId && review.userId === user.id) {
            userReview = review
        }
    })

    if (!userReview) {
        return (
            <span>How was your stay?</span>
        )
    } else {
        return (
            <span>{userReview.review}</span>
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
                        <h2 >Your Review</h2>
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
