const GET_SPOTS = 'spots/GET_SPOTS';
const GET_SPOT_BY_ID = 'spots/GET_SPOT_BY_ID'

const getSpots = (spots) => {
  return {
    type: GET_SPOTS,
    spots
  }
}

const getSpotByID = (spot) => {
  return {
    type: GET_SPOT_BY_ID,
    spot
  }
}

export const getAllSpots = () => async (dispatch) => {
  const response = await fetch('/api/spots')

  if (response.ok) {
    const data = await response.json()
    dispatch(getSpots(data.Spots))
  }
}

export const getOneSpot = (spotId) => async (dispatch) => {
  const response = await fetch(`/api/spots/${spotId}`)

  if (response.ok) {
    const data = await response.json()
    dispatch(getSpotByID(data))
  }
}

const initialState = {}


const spotsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SPOTS:
      const allSpots = {}
      action.spots.forEach(spot => {
        allSpots[spot.id] = spot
      });
      return {
        ...state,
        ...allSpots
      }
    case GET_SPOT_BY_ID:
      const newState = {...state}
      newState.spot = action.spot
      return newState
    default:
      return state
  }
}

export default spotsReducer;
