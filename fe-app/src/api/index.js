import axios from "axios";

const API = axios.create({ baseURL: "http://localhost/api" });

export const fetchAirports = () => API.get(`/airports/list`);
export const fetchFlightsBySearch = ({ code_departure, code_arrival, page }) =>
  API.get(
    `/flights/search?code_departure=${code_departure}&code_arrival=${code_arrival}&page=${
      page || 1
    }`
  );
