import React, { useState } from "react";
import {
  Typography,
  CircularProgress,
  AppBar,
  TextField,
  Button,
} from "@material-ui/core";

import Autocomplete from "@material-ui/lab/Autocomplete";

//hooks
import { useSelector, useDispatch } from "react-redux";

//styles
import useStyles from "./styles";

//actions
import { getFlightsBySearch } from "../../actions/flights";

const Search = () => {
  const [flightParams, setFlight] = useState({
    code_departure: "",
    code_arrival: "",
  });

  const { airports, isLoading } = useSelector((state) => state.airports);

  const classes = useStyles();
  const dispatch = useDispatch();

  const searchFlight = () => {
    if (
      flightParams.code_departure !== "" ||
      flightParams.code_arrival !== ""
    ) {
      dispatch(getFlightsBySearch(flightParams));
    } else {
      alert("You must insert Departure and Arrival");
    }
  };

  return isLoading ? (
    <CircularProgress />
  ) : (
    <AppBar className={classes.appBarSearch} position="static" color="inherit">
      <Typography variant="h5">Flight Search</Typography>
      <Autocomplete
        className={classes.textField}
        disablePortal
        id="combo-box-demo"
        options={airports}
        getOptionLabel={(apt) => apt.name}
        sx={{ width: 300 }}
        onChange={(e, value) =>
          setFlight({ ...flightParams, code_departure: value.code })
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
          setFlight({ ...flightParams, code_arrival: value.code })
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
