import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { getAllUserBookings } from "../../../store/bookings";
import "./UserBookings.css";

function UserBookings() {
  const dispatch = useDispatch();
  const { spotId } = useParams();

  const bookings = useSelector((state) => state.bookings);
  const user = useSelector((state) => state.session.user);

  const [pastBookings, setPastBookings] = useState([]);
  const [upcomingBookings, setUpcomingBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      await dispatch(getAllUserBookings());
      setLoading(false);
    }
    fetchData();
  }, [dispatch]);

  useEffect(() => {
    const dateChecker = (bookings) => {
      // Format today's date to compare with the booking's endDate
      const date = new Date();
      let today = new Date();
      let dd = String(today.getDate()).padStart(2, "0");
      let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
      let yyyy = today.getFullYear();
      today = yyyy + "-" + mm + "-" + dd;

      let pastBookings = [];
      let upcomingBookings = [];

      bookings.forEach((booking) => {
        if (booking.userId == user.id) {
          if (new Date(`${today}`) >= new Date(`${booking.endDate}`)) {
            pastBookings.push(booking);
          } else {
            upcomingBookings.push(booking);
          }
        }
      });

      setPastBookings(pastBookings);
      setUpcomingBookings(upcomingBookings);
    };

    if (Object.keys(bookings).length) {
      dateChecker(Object.values(bookings));
    }
  }, [bookings, user.id]);

  const displayUpcomingTrips = (trips) => {
    if (!trips.length) {
      return (
        <div>
          <h2>No trips booked...yet!</h2>
          <span>Time to dust off your bags and start planning your next adventure </span>
        </div>
      );
    } else {
      return (
        <div className="trips-area">
          <h2>Upcoming Trips</h2>
          {trips.map((trip) => {
            return (

              <div className="trip-info-container">
                <NavLink to={`/trips/${trip.id}`}>
                <img src={`${trip.Spot.previewImage}`} className='trip-image'></img>
                </NavLink>
                <div className="trip-info-details">
                <NavLink to={`/trips/${trip.id}`}  className='trip-nav-link'>
                <span className="trip-city">{trip.Spot.city}</span>
                </NavLink>
                <span className="trip-details">Hosted by {trip.User.firstName}</span>
                <span className="trip-details">Date</span>
                </div>
              </div>

            );
          })}
        </div>
      );
    }
  };

  const displayPastTrips = (trips) => {
    if (!trips.length) {
        return (
          <div>
            <h2>You have no past trips</h2>
          </div>
        );
      } else {
        return (
            <div className="trips-area">
            <h2>Where you’ve been</h2>
            {trips.map((trip) => {
              return (
                <div className="trip-info-container">
                     <NavLink to={`/trips/${trip.id}`}>
                  <img src={`${trip.Spot.previewImage}`} className='trip-image'></img>
                     </NavLink>
                  <div className="trip-info-details">
                  <NavLink to={`/trips/${trip.id}`}  className='trip-nav-link'>
                  <span className="trip-city">{trip.Spot.city}</span>
                  </NavLink>
                  <span className="trip-details">Hosted by {trip.User.firstName}</span>
                  <span className="trip-details">Date</span>
                  </div>
                </div>
              );
            })}
          </div>
        );
      }
  }

  if (loading) {
    return <div>Loading...</div>;
  } else if (upcomingBookings.length || pastBookings.length) {
    return (
      <div className="trips-container">
        <h1 className="trips-heading">Trips</h1>
        <div className="trips-grid upcoming-trips-container">
        {displayUpcomingTrips(upcomingBookings)}
        </div>

        <div className="trips-grid past-trips-container">
        {displayPastTrips(pastBookings)}
        </div>
    </div>
    )
  } else {
    return <>You have no trips</>
  }
}



export default UserBookings
