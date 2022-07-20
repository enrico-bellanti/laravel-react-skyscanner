import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  appBarSearch: {
    borderRadius: 4,
    marginBottom: "1rem",
    display: "flex",
    padding: "16px",
  },
  textField: {
    margin: "30px 0",
  },
  plane: {
    marginLeft: "5px",
  },

  directFlightContainer: {
    backgroundColor: "#7B9E87",
    marginBottom: "30px",
    padding: "10px",
    borderRadius: 4,
  },
  oneStopFlightContainer: {
    backgroundColor: "#1B4079",
    marginBottom: "30px",
    padding: "10px",
    borderRadius: 4,
  },
  twoStopFlightContainer: {
    backgroundColor: "#4A442D",
    marginBottom: "30px",
    padding: "10px",
    borderRadius: 4,
  },
}));
