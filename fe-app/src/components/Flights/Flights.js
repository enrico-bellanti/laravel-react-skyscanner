import React from "react";

//components
import Flight from "./Flight/Flight";

//material
import { Grid, CircularProgress, Typography } from "@material-ui/core";
import AirplanemodeActive from "@material-ui/icons/AirplanemodeActive";

import useStyles from "./styles";

//selectors
import { useSelector } from "react-redux";

const Flights = () => {
  const { flights, isLoading } = useSelector((state) => state.flights);
  const classes = useStyles();

  if (isLoading) {
    return <CircularProgress />;
  } else if (flights.STEPOVER_0 || flights.STEPOVER_1 || flights.STEPOVER_2) {
    return (
      <>
        {flights.STEPOVER_0 && (
          <>
            <div className={classes.directFlightContainer}>
              <Typography className={classes.textField} variant="h6">
                Directs Flights
                <AirplanemodeActive className={classes.plane} />
              </Typography>
              <Grid container alignItems="stretch" spacing={3}>
                {flights.STEPOVER_0.map((flight) => (
                  <Grid item xs={12} lg={8}>
                    <Flight flight={flight} />
                  </Grid>
                ))}
              </Grid>
            </div>
          </>
        )}
        {flights.STEPOVER_1 && (
          <>
            <div className={classes.oneStopFlightContainer}>
              <Typography className={classes.textField} variant="h6">
                One stopover Flights
                <AirplanemodeActive className={classes.plane} />
                <AirplanemodeActive className={classes.plane} />
              </Typography>
              <Grid container alignItems="stretch" spacing={3}>
                {flights.STEPOVER_1.map((flight) => (
                  <Grid item xs={12} lg={8}>
                    <Flight flight={flight} />
                  </Grid>
                ))}
              </Grid>
            </div>
          </>
        )}
        {flights.STEPOVER_2 && (
          <>
            <div className={classes.twoStopFlightContainer}>
              <Typography className={classes.textField} variant="h6">
                Two stopover Flights
                <AirplanemodeActive className={classes.plane} />
                <AirplanemodeActive className={classes.plane} />
                <AirplanemodeActive className={classes.plane} />
              </Typography>
              <Grid container alignItems="stretch" spacing={3}>
                {flights.STEPOVER_2.map((flight) => (
                  <Grid item xs={12} lg={8}>
                    <Flight flight={flight} />
                  </Grid>
                ))}
              </Grid>
            </div>
          </>
        )}
      </>
    );
  } else {
    return "Let's run a search to find your flight";
  }
};

export default Flights;
