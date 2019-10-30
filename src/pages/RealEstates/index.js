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
import { Link } from "react-router-dom";
import uuid from "uuid";
import ReactPaginate from "react-paginate";
import { animateScroll as scroll } from "react-scroll";
import { CircularProgress } from "@material-ui/core";
import { classes } from "istanbul-lib-coverage";

const useSpinnerStyles = makeStyles(theme => ({
  fullScreenSpinner: {
    marginTop: theme.spacing(4),
    width: "100%",
    display: "flex",
    justifyContent: "center"
  }
}));

const FullScreenLoader = () => {
  const classes = useSpinnerStyles();
  return (
    <div className={classes.fullScreenSpinner}>
      <CircularProgress />
    </div>
  );
};

const useStyles = makeStyles(theme => ({
  paginationContainer: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(4),
    "& .pagination": {
      display: "flex",
      justifyContent: "center",
      width: "100%",
      "& li": {
        listStyleType: "none",
        margin: theme.spacing(1) / 2,
        color: "#2196f3",
        backgroundColor: "#fff",
        border: "none",
        borderRadius: 45,
        boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.1)",
        transition: "all 0.3s ease 0s",
        cursor: "pointer",
        outline: "none",
        "& a": {
          padding: theme.spacing(1) + 4,
          outline: "none",
          width: "100%",
          height: "100%"
        }
      },
      "& .active": {
        color: "#0d47a1",
        boxShadow: "0px 4px 23px rgba(0, 0, 0, 0.3)",
        fontWeight: "bolder"
      }
    }
  },
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

function RealEstates(props) {
  const LIMIT = 10;

  const classes = useStyles();
  const [realEstatesData, setRealEstatesData] = useState(null);
  const [uid, setUid] = useState(null);
  const [total, setTotal] = useState(null);
  const [page, setPage] = useState(0);
  console.log("TCL: RealEstates -> page", page);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      scroll.scrollToTop();
      const response = await axios.get(
        `/real-estates/?$limit=${LIMIT}&$skip=${page * LIMIT}`
      );
      setRealEstatesData(response.data.data);
      setTotal(response.data.total);
    }
    setUid(uuid());
    fetchData().then(() => setLoading(false));
  }, [page]);

  const handlePageClick = e => {
    if (e.selected !== page) {
      setPage(e.selected);
      setLoading(true);
    }
  };
  return !loading ? (
    <Container maxWidth="lg" className={classes.container}>
      <Grid container justify="center" className={classes.realEstatesContainer}>
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
                  <Typography>#{`${property.id}`.padStart(5, "0")}</Typography>
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
        <Grid item xs={12}>
          <div className={classes.paginationContainer}>
            <ReactPaginate
              initialPage={page}
              breakLabel={"..."}
              breakClassName={"break-me"}
              pageCount={total / LIMIT}
              pageRangeDisplayed={5}
              onPageChange={handlePageClick}
              containerClassName={"pagination"}
              subContainerClassName={"pages pagination"}
              activeClassName={"active"}
            />
          </div>
        </Grid>
      </Grid>
    </Container>
  ) : (
    <FullScreenLoader />
  );
}

RealEstates.propTypes = {};

export default RealEstates;
