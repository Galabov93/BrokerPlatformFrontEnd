import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "../../config/API";
import {
  Container,
  Button,
  Grid,
  Typography,
  Paper,
  Hidden
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import SearchIcon from "@material-ui/icons/Search";
import PlusIcon from "@material-ui/icons/Add";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import uuid from "uuid";

const useStyles = makeStyles(theme => ({
  container: {
    marginTop: theme.spacing(4),
    "& a": {
      textDecoration: "none"
    }
  },
  rightIcon: {
    marginLeft: theme.spacing(1)
  },
  button: {},
  realEstatesContainer: {
    marginTop: theme.spacing(4),
    "& > div": {
      margin: `${theme.spacing(1)}px auto`
    }
  },
  realEstateListItem: {
    display: "flex",
    height: 190,
    [theme.breakpoints.up("lg")]: {
      height: 240
    },
    "& aside": {
      flexBasis: "40%",
      width: 160,
      marginRight: theme.spacing(1),
      position: "relative",
      "& > a": {
        position: "absolute",
        width: "100%",
        height: "100%",
        top: 0,
        left: 0
      },
      "& > img": {
        objectFit: "cover",
        width: "100%",
        height: "100%"
      }
    },
    "& main": {
      justifyContent: "space-between",
      display: "flex",
      flexDirection: "column",
      flexBasis: "60%",

      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
      [theme.breakpoints.up("lg")]: {
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2)
      },
      "& p": {
        padding: theme.spacing(1) / 2
      },
      "& .priceContainer": {
        marginRight: theme.spacing(2),
        // [theme.breakpoints.down("lg")]: {
        display: "flex",
        justifyContent: "space-between",
        // },,
        "& .price": {
          fontSize: 18,
          fontWeight: 700,
          color: "#a00"
        }
      },
      "& .city_neighborhood": {
        display: "-webkit-box",
        WebkitLineClamp: 2,
        WebkitBoxOrient: "vertical",
        overflow: "hidden"
      },
      "& .editButton": {
        marginLeft: "auto",
        marginRight: theme.spacing(2)
      }
    }
  }
}));

// dispatch an action

// const ADD_NEW_REAL_ESTATE_BUTTON_CLICKED = {
//   type: "ADD_NEW_REAL_ESTATE"
// };

// const SEARCH_REAL_ESTATE_BUTTON_CLICKED = {
//   type: "SEARCH_REAL_ESTATE_BUTTON_CLICKED"
// };

const LOAD_REAL_ESTATE_DATA = page => ({ page, type: "LOAD_REAL_ESTATE_DATA" });

function RealEstates(props) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [realEstatesData, setRealEstatesData] = useState(null);
  const [uid, setUid] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get("/real-estates");
      setRealEstatesData(response.data.data);
    }
    fetchData();
    setUid(uuid());
  }, []);

  // function handleClick(event) {
  //   const name = event.target.name;
  //   if (name === "search") {
  //     // dispatch
  //     dispatch(SEARCH_REAL_ESTATE_BUTTON_CLICKED);
  //   } else if (name === "newRealEstate") {
  //     dispatch(ADD_NEW_REAL_ESTATE_BUTTON_CLICKED);
  //   }
  // }

  return (
    realEstatesData !== null && (
      <Container maxWidth="lg" className={classes.container}>
        <Grid container spacing={3} justify="space-around">
          <Grid item>
            <Link to={`property/add/${uid}`}>
              <Button
                name="newRealEstate"
                variant="contained"
                color="primary"
                className={classes.button}
              >
                Нов имот
                <PlusIcon className={classes.rightIcon} />
              </Button>
            </Link>
          </Grid>

          <Grid item>
            <Link to="search-new-real-estate">
              <Button
                name="search"
                variant="contained"
                color="primary"
                className={classes.button}
              >
                Търсене
                <SearchIcon className={classes.rightIcon} />
              </Button>
            </Link>
          </Grid>
        </Grid>

        <Grid
          container
          justify="center"
          className={classes.realEstatesContainer}
        >
          {realEstatesData.map((property, index) => (
            <Grid key={`property-${index}`} item xs={12} sm={10} md={8}>
              <Paper className={classes.realEstateListItem}>
                <aside>
                  <img
                    src={
                      "https://broker-platfrom-storage-bucket.s3.eu-central-1.amazonaws.com/2c156621419843728/bigPhotos/2c156621419843728_GB"
                    }
                    alt=""
                  />
                  <Link to={`property-page/${property.id}`}></Link>
                </aside>
                <main>
                  <div className={"priceContainer"}>
                    <Typography>
                      #{`${property.id}`.padStart(5, "0")}
                    </Typography>
                    <Typography className="price">
                      {property.real_estates_original_price}{" "}
                      {property.real_estates_currency}
                    </Typography>
                  </div>
                  <Typography className="type_size">
                    {property.real_estates_construction_type},{" "}
                    {property.real_estates_size} кв.м
                  </Typography>
                  <Typography className="city_neighborhood">
                    {property.real_estates_city},{" "}
                    {property.real_estates_neighborhood}
                  </Typography>
                  <Hidden mdDown>
                    <Typography className="city_neighborhood">
                      {property.real_estates_description}
                    </Typography>
                  </Hidden>
                  <Link className="editButton" to="/edit/id">
                    <Button variant="contained" color="primary">
                      Редактирай
                    </Button>
                  </Link>
                </main>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    )
  );
}

RealEstates.propTypes = {};

export default RealEstates;
