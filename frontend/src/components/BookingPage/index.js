import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getOneBooking } from '../../store/bookings'
import { useHistory } from 'react-router-dom'
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
    return (
        <div className='booking-page-container'>
            <img src='https://images.unsplash.com/photo-1677219936861-441e1bade670?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDN8RnpvM3p1T0hONnd8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60'></img>
            <span>{booking.id}</span>
        </div>
    )

} else {
    return <></>
}

}

export default BookingPage
