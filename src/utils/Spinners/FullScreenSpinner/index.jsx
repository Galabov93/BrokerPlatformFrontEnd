import React from "react";
import { makeStyles, CircularProgress } from "@material-ui/core";

const useSpinnerStyles = makeStyles(theme => ({
  fullScreenSpinner: {
    marginTop: theme.spacing(4),
    width: "100%",
    display: "flex",
    justifyContent: "center"
  }
}));

export const FullScreenLoader = () => {
  const classes = useSpinnerStyles();
  return (
    <div className={classes.fullScreenSpinner}>
      <CircularProgress />
    </div>
  );
};
