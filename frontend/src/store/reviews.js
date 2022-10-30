import { csrfFetch } from "./csrf";

const GET_REVIEWS = 'spots/GET_REVIEWS';
const ADD_REVIEW = 'spots/ADD_REVIEW'
const DELETE_REVIEW = 'spots/DELETE_REVIEW'

const getReviews = (reviews, spotId) => {
  return {
    type: GET_REVIEWS,
    reviews,
    spotId
  }
}

const addOneReview = (review) => {
  return {
    type: ADD_REVIEW,
    review
  }
}

const deleteOneReview = (reviewId) => {
  return {
    type: DELETE_REVIEW,
    reviewId
  }
}

export const getAllReviews = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}/reviews`)
  if (response.ok) {
    const data = await response.json()
    dispatch(getReviews(data.Reviews))
  }
}

export const createReview = (data) => async (dispatch) => {
  try {
      const response = await csrfFetch(``, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
      });

      if (!response.ok) {
          let error;
          if (response.status === 422) {
              error = await response.json();
              throw new Error('error')
              // throw new ValidationError(error.errors, response.statusText);
          } else {
              let errorJSON;
              error = await response.text();
              try {
                  errorJSON = JSON.parse(error);
              } catch {
                  throw new Error(error);
              }
              throw new Error(`${errorJSON.title}: ${errorJSON.message}`);
          }
      }

      const review = await response.json();
      dispatch(addOneReview(review));
      return review;
  } catch (error) {
      throw error;
  }
};

export const deleteReview = (reviewId) => async dispatch => {
  const response = await csrfFetch(``, {
    method: 'DELETE',
  });

  if (response.ok) {
    dispatch(deleteOneReview(reviewId));
    return {message: 'Spot was deleted'};
  }
};

const initialState = {}

const reviewsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_REVIEWS:
      const allReviews = {}
      action.reviews.forEach(review => {
        allReviews[review.id] = review;
      });
      return {
        ...state,
        ...allReviews
      }
    case ADD_REVIEW:
      // if (!state[action.spot.id]) {
      return {
        ...state,
        [action.review.id]: action.review,
        }
      // }
    case DELETE_REVIEW:
        let newState = {...state}
        delete newState[action.reviewId]
        return newState
    default:
      return state
  }
}

export default reviewsReducer;
