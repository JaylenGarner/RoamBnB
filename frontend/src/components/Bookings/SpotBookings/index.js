import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useParams } from "react-router-dom"
import { getAllSpotBookings } from "../../../store/bookings"


function SpotBookings() {
    const dispatch = useDispatch()
    const { spotId } = useParams()

    const bookings = useSelector((state) => state.bookings)

    useEffect(() => {
        dispatch(getAllSpotBookings(spotId))
    }, [spotId])

    if (!bookings) {
        return <></>
    } else {

        const spotBookings = Object.values(bookings).map((booking) => {
            if (booking.spotId == spotId) return booking
        })

        return (
            <div>
                {spotBookings.map((booking) => {
                    if (booking && booking.User) {
                        return (
                            <div>
                                <span>{`${booking.User.firstName} ${booking.User.lastName}: ${booking.startDate} - ${booking.endDate}`}</span>
                            <br></br>
                            </div>
                        )
                    }
                })}
            </div>
        )
    }


}



export default SpotBookings
