import React, { useState, useEffect } from "react";
import { Typography, AppBar, TextField, Button } from "@material-ui/core";

import Autocomplete from "@material-ui/lab/Autocomplete";

//hooks
import { useSelector, useDispatch } from "react-redux";

//styles
import useStyles from "./styles";

//actions
import { getFlightsBySearch } from "../../actions/flights";

const Search = () => {
  const { airports } = useSelector((state) => state.airports);
  const [searchQuery, setQuery] = useState({
    code_departure: "",
    code_arrival: "",
  });
  const [listDeparture, setListDeparture] = useState([]);
  const [listArrival, setListArrival] = useState([]);

  useEffect(() => {
    if (listDeparture.length < 1) {
      setListDeparture(airports);
    }
    if (listArrival.length < 1) {
      setListArrival(airports);
    }
  }, [airports, listDeparture, listArrival]);

  const classes = useStyles();
  const dispatch = useDispatch();

  const setArrivalCode = (code_arrival) => {
    if (!!code_arrival) {
      setQuery({ ...searchQuery, code_arrival: code_arrival.code });
      const list = airports.filter((a) => a.code !== code_arrival.code);
      setListDeparture(list);
    } else {
      setListArrival(airports);
      setQuery({ ...searchQuery, code_arrival: "" });
    }
  };
  const setDepartureCode = (code_departure) => {
    if (!!code_departure) {
      setQuery({ ...searchQuery, code_departure: code_departure.code });
      const list = airports.filter((a) => a.code !== code_departure.code);
      setListArrival(list);
    } else {
      setListArrival(airports);
      setQuery({ ...searchQuery, code_departure: "" });
    }
  };

  const searchFlight = () => {
    if (searchQuery.code_departure !== "" && searchQuery.code_arrival !== "") {
      dispatch(getFlightsBySearch(searchQuery));
    } else {
      alert("Please enter Departure and Arrival Airport.");
    }
  };

  return (
    <AppBar className={classes.appBarSearch} position="static" color="inherit">
      <Typography variant="h5">Flight Search</Typography>
      <Autocomplete
        className={classes.textField}
        disablePortal
        id="combo-box-demo-1"
        options={listDeparture}
        getOptionLabel={(apt) => apt.name}
        sx={{ width: 300 }}
        onChange={(e, value) => setDepartureCode(value)}
        renderInput={(params) => <TextField {...params} label="Departure" />}
      />

      <Autocomplete
        className={classes.textField}
        disablePortal
        id="combo-box-demo-2"
        options={listArrival}
        getOptionLabel={(apt) => apt.name}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Arrival" />}
        onChange={(e, value) => setArrivalCode(value)}
      />
      <Button
        onClick={searchFlight}
        className={classes.searchButton}
        color="primary"
        variant="contained"
      >
        Search
      </Button>
    </AppBar>
  );
};

export default Search;
