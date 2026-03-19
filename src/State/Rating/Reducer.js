import {
  CREATE_RATING_REQUEST, CREATE_RATING_SUCCESS, CREATE_RATING_FAILURE,
  GET_ALL_RATINGS_REQUEST, GET_ALL_RATINGS_SUCCESS, GET_ALL_RATINGS_FAILURE
} from "./ActionType";

const initialState = {
  ratings: [],
  loading: false,
  error: null,
};

export const ratingReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_RATING_REQUEST:
    case GET_ALL_RATINGS_REQUEST:
      return { ...state, loading: true, error: null };

    case CREATE_RATING_SUCCESS:
      return { ...state, loading: false, ratings: [...state.ratings, action.payload] };

    case GET_ALL_RATINGS_SUCCESS:
      return { ...state, loading: false, ratings: action.payload };

    case CREATE_RATING_FAILURE:
    case GET_ALL_RATINGS_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};