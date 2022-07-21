import React from "react";

//components
import Flight from "./Flight/Flight";

//material
import { Grid, CircularProgress, Typography } from "@material-ui/core";

import useStyles from "./styles";

//selectors
import { useSelector } from "react-redux";

const Flights = () => {
  const { flights, isLoading } = useSelector((state) => state.flights);

  const classes = useStyles();

  const render = () => {
    if (isLoading) {
      return (
        <Grid item xs={12} sm={12} md={8}>
          <CircularProgress />
        </Grid>
      );
    } else if (flights.length > 0) {
      return flights.map((travel, i) => (
        <Grid key={i} item xs={12} sm={12} md={12}>
          <Flight travel={travel} />
        </Grid>
      ));
    } else if (flights.length < 0) {
      return (
        <Grid item xs={12} sm={12} md={8}>
          <Typography className={classes.textField} variant="inherit">
            There is no flight for your search. Try another airport
          </Typography>
        </Grid>
      );
    } else {
      return (
        <Grid item xs={12} sm={12} md={8}>
          <Typography className={classes.textField} variant="inherit">
            Let's run a search to find your flight!
          </Typography>
        </Grid>
      );
    }
  };

  return (
    <div className={classes.travelsContainer}>
      <Typography className={classes.textField} variant="h4">
        Flight List
      </Typography>
      <Grid container alignItems="stretch" spacing={3}>
        {render()}
      </Grid>
    </div>
  );
};

export default Flights;
