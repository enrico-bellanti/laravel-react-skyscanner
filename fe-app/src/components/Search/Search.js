import React, { useState, useEffect } from "react";
import { Typography, AppBar, TextField, Button } from "@material-ui/core";

//hooks
import { useDispatch } from "react-redux";

//styles
import useStyles from "./styles";

//actions
import { getFlightsBySearch } from "../../actions/flights";

const Search = () => {
  const [flightParams, setFlight] = useState({
    code_departure: "",
    code_arrival: "",
  });

  const classes = useStyles();
  const dispatch = useDispatch();

  const searchFlight = () => {
    dispatch(getFlightsBySearch(flightParams));
  };

  return (
    <AppBar className={classes.appBarSearch} position="static" color="inherit">
      <Typography variant="h5">Flight Search</Typography>
      <TextField
        name="code_departure"
        variant="outlined"
        label="Departure"
        className={classes.textField}
        fullWidth
        value={flightParams.code_departure}
        onChange={(e) =>
          setFlight({ ...flightParams, code_departure: e.target.value.trim() })
        }
      />
      <TextField
        name="code_arrival"
        variant="outlined"
        label="Arrival"
        className={classes.textField}
        fullWidth
        value={flightParams.code_arrival}
        onChange={(e) =>
          setFlight({ ...flightParams, code_arrival: e.target.value.trim() })
        }
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
