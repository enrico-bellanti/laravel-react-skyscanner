import React from "react";
import { useSelector } from "react-redux";

//material
import { Container, Grid } from "@material-ui/core";

//components
import Search from "./components/Search/Search";
import Flights from "./components/Flights/Flights";

// styles
import useStyles from "./styles";

const App = () => {
  const classes = useStyles();
  const { flights } = useSelector((state) => state.flights);

  return (
    <Container maxWidth="xl">
      <Grid
        container
        className={classes.gridContainer}
        justifyContent="space-between"
        alignItems="stretch"
        spacing={3}
      >
        <Grid item xs={12} sm={7} md={9}>
          <Flights flights={flights} />
        </Grid>

        <Grid item xs={12} sm={5} md={3}>
          <Search />
        </Grid>
      </Grid>
    </Container>
  );
};

export default App;
