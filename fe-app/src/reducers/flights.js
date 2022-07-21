import {
  FETCH_FLIGHTS,
  FETCH_FLIGHTS_BY_SEARCH,
  START_LOADING,
  END_LOADING,
} from "../constants/actionTypes";

export default (state = { isLoading: false, flights: 0 }, action) => {
  switch (action.type) {
    case START_LOADING:
      return { ...state, isLoading: true };

    case END_LOADING:
      return { ...state, isLoading: false };

    case FETCH_FLIGHTS:
      return {
        ...state,
        flights: action.payload,
      };

    case FETCH_FLIGHTS_BY_SEARCH:
      return { ...state, flights: action.payload };
    default:
      return state;
  }
};
