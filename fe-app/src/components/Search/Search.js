import React, { useState, useEffect } from "react";
import { Typography, AppBar, TextField, Button } from "@material-ui/core";

import Autocomplete from "@material-ui/lab/Autocomplete";

//hooks
import { useDispatch, useSelector } from "react-redux";

//styles
import useStyles from "./styles";

//actions
import { getFlightsBySearch } from "../../actions/flights";
import { getAirports } from "../../actions/airports";

const Search = () => {
  const [flightParams, setFlight] = useState({
    code_departure: "",
    code_arrival: "",
  });
  //prendere la lista degli aeroporti e salvarla nello state
  const { airports } = useSelector((state) => state.airports);

  const classes = useStyles();
  const dispatch = useDispatch();

  const searchFlight = () => {
    //check if both input are setted
    dispatch(getFlightsBySearch(flightParams));
  };

  useEffect(() => {
    dispatch(getAirports());
  }, [dispatch]);

  return (
    <AppBar className={classes.appBarSearch} position="static" color="inherit">
      <Typography variant="h5">Flight Search</Typography>
      {/* <TextField
        name="code_departure"
        variant="outlined"
        label="Departure"
        className={classes.textField}
        fullWidth
        value={flightParams.code_departure}
        onChange={(e) =>
          setFlight({ ...flightParams, code_departure: e.target.value.trim() })
        }
      /> */}
      <Autocomplete
        className={classes.textField}
        disablePortal
        id="combo-box-demo"
        options={airports}
        getOptionLabel={(apt) => apt.name}
        sx={{ width: 300 }}
        onChange={(e, value) =>
          setFlight({ ...flightParams, code_departure: value })
        }
        renderInput={(params) => <TextField {...params} label="Departure" />}
      />

      <Autocomplete
        className={classes.textField}
        disablePortal
        id="combo-box-demo"
        options={airports}
        getOptionLabel={(apt) => apt.name}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Arrival" />}
        onChange={(e, value) =>
          setFlight({ ...flightParams, code_arrival: value })
        }
      />
      {/* <TextField
        name="code_arrival"
        variant="outlined"
        label="Arrival"
        className={classes.textField}
        fullWidth
        value={flightParams.code_arrival}
        onChange={(e) =>
          setFlight({ ...flightParams, code_arrival: e.target.value.trim() })
        }
      /> */}
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
