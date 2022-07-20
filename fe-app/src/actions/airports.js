import * as api from "../api";
import { FETCH_AIRPORTS } from "../constants/actionTypes";

export const getAirports = () => async (dispatch) => {
  try {
    const { data } = await api.fetchAirports();
    dispatch({ type: FETCH_AIRPORTS, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};
