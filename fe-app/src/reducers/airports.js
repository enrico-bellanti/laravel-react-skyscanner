import {
  FETCH_AIRPORTS,
  START_LOADING,
  END_LOADING,
} from "../constants/actionTypes";

export default (state = { isLoading: false, airports: [] }, action) => {
  switch (action.type) {
    case START_LOADING:
      return { ...state, isLoading: true };

    case END_LOADING:
      return { ...state, isLoading: false };
    case FETCH_AIRPORTS:
      return {
        ...state,
        airports: action.payload,
      };

    default:
      return state;
  }
};
