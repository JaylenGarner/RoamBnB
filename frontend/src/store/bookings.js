import { csrfFetch } from "./csrf";

const GET_SPOT_BOOKINGS = 'bookings/GET_SPOT_BOOKINGS';
const GET_USER_BOOKINGS = 'bookings/GET_USER_BOOKINGS'
const GET_BOOKING_BY_ID = 'bookings/GET_BOOKING_BY_ID'
const DELETE_BOOKING = 'bookings/DELETE_BOOKING'
// const ADD_SPOT = 'spots/ADD_SPOT'

const getSpotBookings = (bookings) => {
  return {
    type: GET_SPOT_BOOKINGS,
    bookings
  }
}

const getUserBookings = (bookings) => {
    return {
      type: GET_USER_BOOKINGS,
      bookings
    }
  }

const getBookingById = (booking) => {
  return {
    type: GET_BOOKING_BY_ID,
    booking
  }
}

// const addOneSpot = (spot) => {
//   return {
//     type: ADD_SPOT,
//     spot
//   }
// }

const deleteOneBooking = (bookingId) => {
  return {
    type: DELETE_BOOKING,
    bookingId
  }
}

export const getAllSpotBookings = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}/bookings`)

  if (response.ok) {
    const data = await response.json()
    dispatch(getSpotBookings(data))
  }
}

export const getAllUserBookings = () => async (dispatch) => {
    const response = await csrfFetch('/api/bookings/current')

    if (response.ok) {
      const data = await response.json()
      dispatch(getUserBookings(data))
    }
  }

export const getOneBooking = (bookingId) => async (dispatch) => {
  const response = await fetch(`/api/bookings/${bookingId}`)

  if (response.ok) {
    const data = await response.json()
    dispatch(getBookingById(data))
  }
}

// export const createSpot = (data) => async (dispatch) => {
//   try {
//       const response = await csrfFetch(`/api/spots`, {
//           method: 'POST',
//           headers: {
//               'Content-Type': 'application/json',
//           },
//           body: JSON.stringify(data),
//       });

//       if (!response.ok) {
//           let error;
//           if (response.status === 422) {
//               error = await response.json();
//               throw new Error('error')
//               // throw new ValidationError(error.errors, response.statusText);
//           } else {
//               let errorJSON;
//               error = await response.text();
//               try {
//                   errorJSON = JSON.parse(error);
//               } catch {
//                   throw new Error(error);
//               }
//               throw new Error(`${errorJSON.title}: ${errorJSON.message}`);
//           }
//       }

//       const spot = await response.json();
//       dispatch(addOneSpot(spot));
//       return spot;
//   } catch (error) {
//       throw error;
//   }
// };

// export const editSpot = (data, spotId) => async (dispatch) => {
//   try {
//       const response = await csrfFetch(`/api/spots/${spotId}`, {
//           method: 'PUT',
//           headers: {
//               'Content-Type': 'application/json',
//           },
//           body: JSON.stringify(data),
//       });

//       if (!response.ok) {
//           let error;
//           if (response.status === 422) {
//               error = await response.json();
//               throw new Error('error')
//               // throw new ValidationError(error.errors, response.statusText);
//           } else {
//               let errorJSON;
//               error = await response.text();
//               try {
//                   errorJSON = JSON.parse(error);
//               } catch {
//                   throw new Error(error);
//               }
//               throw new Error(`${errorJSON.title}: ${errorJSON.message}`);
//           }
//       }

//       const spot = await response.json();
//       dispatch(addOneSpot(spot));
//       return spot;
//   } catch (error) {
//       throw error;
//   }
// };

export const deleteBooking = (bookingId) => async dispatch => {
  const response = await csrfFetch(`/api/bookings/${bookingId}`, {
    method: 'DELETE',
  });

  if (response.ok) {
    dispatch(deleteOneBooking(bookingId));
    return {message: 'Booking was deleted'};
  }
};

const initialState = {}

const bookingsReducer = (state = initialState, action) => {
  const newState = {...state}
  if (!action || !action.type) return state;
  switch (action.type) {
    case GET_SPOT_BOOKINGS:
      action.bookings.forEach(booking => {
        newState[booking.id] = booking
      });
      return {...newState}
    case GET_USER_BOOKINGS:
        action.bookings.forEach(booking => {
        newState[booking.id] = booking
        });
        return {...newState}

    case GET_BOOKING_BY_ID:
      newState[action.booking.id] = action.booking
      return {...newState}
    // case ADD_SPOT:
    //   newState[action.spot.id] = action.spot
    //   return {...newState}
    case DELETE_BOOKING:
        delete newState[action.bookingId]
        return newState
    default:
      return state
  }
}

export default bookingsReducer;
