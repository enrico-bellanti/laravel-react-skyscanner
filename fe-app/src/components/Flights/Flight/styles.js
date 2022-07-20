import { makeStyles } from "@material-ui/core/styles";

export default makeStyles({
  media: {
    borderRadius: 5,
    height: 100,
    width: 100,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    backgroundBlendMode: "darken",
  },
  cardContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  textWrapper: {
    display: "flex",
    // flexDirection: "row",
  },
});
