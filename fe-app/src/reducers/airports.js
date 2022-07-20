import { FETCH_AIRPORTS } from "../constants/actionTypes";

export default (state = { isLoading: true, airports: [] }, action) => {
  // console.log(action.payload);
  switch (action.type) {
    case FETCH_AIRPORTS:
      return {
        ...state,
        airports: action.payload.data,
      };

    default:
      return state;
  }
};
