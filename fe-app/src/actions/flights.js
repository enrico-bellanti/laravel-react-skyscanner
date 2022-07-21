import * as api from "../api";
import {
  FETCH_FLIGHTS_BY_SEARCH,
  START_LOADING,
  END_LOADING,
} from "../constants/actionTypes";

export const getFlightsBySearch = (searchParams) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });

    const { data } = await api.fetchFlightsBySearch(searchParams);

    dispatch({
      type: FETCH_FLIGHTS_BY_SEARCH,
      payload: {
        data: data.data,
        searchParams,
        currentPage: data.current_page,
        numberOfPages: data.last_page,
      },
    });

    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error.message);
  }
};
