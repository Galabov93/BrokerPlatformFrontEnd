import React from "react";
import RealEstates from "../RealEstates";
import { Container, Grid, makeStyles } from "@material-ui/core";
import RealEstateFilters from "../../components/RealEstatesFilter";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(4),
    "& a": {
      textDecoration: "none",
    },
  },
  realEstatesContainer: {
    marginTop: theme.spacing(4),
    "& > div": {
      margin: `${theme.spacing(1)}px auto`,
    },
  },
}));

export default function RealEstatesPage({ currentFilters, setCurrentFilters }) {
  const classes = useStyles();

  return (
    <Container maxWidth="lg" className={classes.container}>
      <Grid container justify="center" className={classes.realEstatesContainer}>
        <Grid container spacing={3} justify="space-around">
          {/* Filters component */}
          <RealEstateFilters
            currentFilters={currentFilters}
            setCurrentFilters={setCurrentFilters}
          />
          <RealEstates currentFilters={currentFilters} />
        </Grid>
      </Grid>
    </Container>
  );
}
