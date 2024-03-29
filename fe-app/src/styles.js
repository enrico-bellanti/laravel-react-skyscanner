import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  gridContainer: {
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column-reverse",
    },
  },
  pagination: {
    borderRadius: 4,
    marginTop: "1rem",
    padding: "16px",
  },
}));
