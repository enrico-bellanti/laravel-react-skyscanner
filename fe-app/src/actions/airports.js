import * as api from "../api";
import {
  FETCH_AIRPORTS,
  END_LOADING,
  START_LOADING,
} from "../constants/actionTypes";

export const getAirports = () => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });

    const { data } = await api.fetchAirports();

    dispatch({ type: FETCH_AIRPORTS, payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error.message);
  }
};
