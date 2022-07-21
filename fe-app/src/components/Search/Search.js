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
  const [arrival, setArrival] = useState("");
  const [departure, setDeparture] = useState("");
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

  const setArrivalCode = (code) => {
    setArrival(code);
    const list = airports.filter((a) => a.code !== code);
    setListDeparture(list);
  };
  const setDepartureCode = (code) => {
    setDeparture(code);
    const list = airports.filter((a) => a.code !== code);
    setListArrival(list);
  };

  const searchFlight = () => {
    if (departure !== "" && arrival !== "") {
      dispatch(
        getFlightsBySearch({
          code_departure: departure,
          code_arrival: arrival,
        })
      );
    } else {
      alert("You must insert Departure and Arrival");
    }
  };

  return (
    <AppBar className={classes.appBarSearch} position="static" color="inherit">
      <Typography variant="h5">Flight Search</Typography>
      <Autocomplete
        className={classes.textField}
        disablePortal
        id="combo-box-demo"
        options={listDeparture}
        getOptionLabel={(apt) => apt.name}
        sx={{ width: 300 }}
        onChange={(e, value) => setDepartureCode(value.code)}
        renderInput={(params) => <TextField {...params} label="Departure" />}
      />

      <Autocomplete
        className={classes.textField}
        disablePortal
        id="combo-box-demo"
        options={listArrival}
        getOptionLabel={(apt) => apt.name}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Arrival" />}
        onChange={(e, value) => setArrivalCode(value.code)}
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
