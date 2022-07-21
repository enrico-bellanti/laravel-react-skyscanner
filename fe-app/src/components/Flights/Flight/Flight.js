import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Divider,
} from "@material-ui/core/";

import AirplanemodeActive from "@material-ui/icons/AirplanemodeActive";

//selectors
import { useSelector } from "react-redux";

import useStyles from "./styles";

const Flight = ({ travel }) => {
  const classes = useStyles();
  const { airports } = useSelector((state) => state.airports);

  const getAptNameFromCode = (code, airports) => {
    const { name } = airports.find((apt) => apt.code === code);
    return name;
  };

  const randNumb = () => Math.floor(Math.random() * 100);

  return (
    <Card className={classes.cardContainer}>
      <Box>
        <CardContent pb={0}>
          <CardMedia
            className={classes.media}
            image={
              `https://source.unsplash.com/random/100x100?sig=${randNumb()}` ||
              "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
            }
            title="Your Travel"
          />
        </CardContent>
      </Box>
      <Box>
        <CardContent>
          <div>
            {travel.map((f, i) => (
              <AirplanemodeActive key={i} />
            ))}
          </div>
          {travel.map((flt, i) => (
            <div key={i}>
              <Typography component="div" variant="inherit">
                {getAptNameFromCode(flt.code_departure, airports)} -{" "}
                {getAptNameFromCode(flt.code_arrival, airports)}
              </Typography>
              <Typography component="div" variant="inherit">
                € {flt.price}
              </Typography>
              <Divider />
            </div>
          ))}
        </CardContent>
      </Box>
    </Card>
  );
};

export default Flight;
