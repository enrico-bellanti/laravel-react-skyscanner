import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Divider,
} from "@material-ui/core/";

import useStyles from "./styles";

const Flight = ({ flight }) => {
  const classes = useStyles();
  const travel = [];

  if (flight.id_1) {
    travel.push({
      id: flight.id_1,
      code_departure: flight.code_departure_1,
      code_arrival: flight.code_arrival_1,
      price: flight.price_1,
    });
  }
  if (flight.id_2) {
    travel.push({
      id: flight.id_2,
      code_departure: flight.code_departure_2,
      code_arrival: flight.code_arrival_2,
      price: flight.price_2,
    });
  }
  if (flight.id_3) {
    travel.push({
      id: flight.id_3,
      code_departure: flight.code_departure_3,
      code_arrival: flight.code_arrival_3,
      price: flight.price_3,
    });
  }

  return (
    <Card className={classes.cardContainer}>
      <Box>
        <CardContent pb={0}>
          <CardMedia
            className={classes.media}
            image={
              "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
            }
            title="Your Travel"
          />
        </CardContent>
      </Box>
      <Box>
        <CardContent>
          {travel.map((flt) => (
            <>
              <div>
                <Typography component="div" variant="inherit">
                  {flt.code_departure} - {flt.code_arrival}
                </Typography>
                <Typography component="div" variant="inherit">
                  € {flt.price}
                </Typography>
              </div>
              <Divider />
            </>
          ))}
        </CardContent>
      </Box>
    </Card>
  );
};

export default Flight;
