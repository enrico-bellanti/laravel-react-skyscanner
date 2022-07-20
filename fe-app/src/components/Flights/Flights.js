import React from "react";
//components
import Flight from "./Flight/Flight";
import { Grid, CircularProgress, Typography } from "@material-ui/core";
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
          <Grid
            className={classes.container}
            container
            alignItems="stretch"
            spacing={3}
          >
            {flights.STEPOVER_0.map((flight) => (
              <Grid item xs={12} sm={12} md={6} lg={3}>
                <Flight flight={(flight, 0)} />
              </Grid>
            ))}
          </Grid>
        )}
        {flights.STEPOVER_1 && (
          <Grid
            className={classes.container}
            container
            alignItems="stretch"
            spacing={3}
          >
            {flights.STEPOVER_1.map((flight) => (
              <Grid item xs={12} sm={12} md={6} lg={3}>
                <Flight flight={(flight, 1)} />
              </Grid>
            ))}
          </Grid>
        )}
        {flights.STEPOVER_2 && (
          <Grid
            className={classes.container}
            container
            alignItems="stretch"
            spacing={3}
          >
            {flights.STEPOVER_2.map((flight) => (
              <Grid item xs={12} sm={12} md={6} lg={3}>
                <Flight flight={(flight, 2)} />
              </Grid>
            ))}
          </Grid>
        )}
      </>
    );
  } else {
    return "Let's run a search to find your flight";
  }
};

export default Flights;
