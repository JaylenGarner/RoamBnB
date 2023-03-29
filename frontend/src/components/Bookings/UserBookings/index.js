import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useParams } from "react-router-dom"
import { getAllUserBookings } from "../../../store/bookings"
import './UserBookings.css'



function UserBookings() {
    const dispatch = useDispatch()
    const { spotId } = useParams()

    const bookings = useSelector((state) => state.bookings)
    const user = useSelector((state) => state.session.user)

    const [pastBookings, setPastBookings] = useState([])
    const [upcomingBookings, setUpcomingBookings] = useState([])

    const dateChecker = (bookings) => {

            bookings.forEach((booking) => {
                const date = new Date()
                const today = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`

                console.log(today)
                if (booking.userId == user.id) {


                }
            })
        }


    useEffect(() => {
        dispatch(getAllUserBookings())
    }, [user.id])

    if (!bookings) {
        return <></>
    } else {

        const userBookings = Object.values(bookings).map((booking) => {
            if (booking.userId == user.id) return booking
        })

        dateChecker(Object.values(bookings))

        return (
            <div className="trips-container">

                {userBookings.forEach((booking) => {
                    if (booking && booking.Spot) {
                        return (
                            <div>
                                <span>{`${booking.startDate} - ${booking.endDate}`}</span>
                            <br></br>
                            </div>
                        )
                    }
                })}
            </div>
        )
    }

}



export default UserBookings
