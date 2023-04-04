import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getOneBooking } from '../../store/bookings'
import { useHistory } from 'react-router-dom'

import bookingDateFormatter from '../../tools/bookingDateFormatter'

import "./BookingPage.css";


function BookingPage() {
const dispatch = useDispatch()
const history = useHistory()

const {bookingId} = useParams()
const bookings = useSelector((state) => state.bookings)
const booking = bookings[bookingId]
const user = useSelector((state) => state.session.user)

useEffect(() => {

    dispatch(getOneBooking(bookingId))

}, [dispatch, bookingId])


if (booking) {

    if (booking.userId !== user.id) {
        history.push('/trips')
    }

    if (booking.Spot && booking.Spot.Owner) {

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
                            <h2 className='booking-page-reservation-details-text'>Reservation Details</h2>
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
