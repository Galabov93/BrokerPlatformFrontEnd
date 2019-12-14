import React, { useState, useEffect } from "react";
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
import { animateScroll as scroll } from "react-scroll";
import { FullScreenLoader } from "../../utils/Spinners/FullScreenSpinner";
import Pagination from "../../components/Pagination";
import { Link } from "react-router-dom";
import { S3_BASE_URL } from "../../utils/constants";
import { RealEstateFilters } from "../../components/RealEstatesFilter";
import NoPhoto from "../../no-photo-image.jpg";

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

function RealEstates(props) {
  const classes = useStyles();
  const LIMIT = 20;
  const [realEstatesData, setRealEstatesData] = useState(null);
  const [total, setTotal] = useState(null);
  const [page, setPage] = useState(0);

  const [propertiesLoading, setPropertiesLoading] = useState(true);
  const [loading, setLoading] = useState(true);
  const [currentFilters, setCurrentFilters] = useState(null);

  useEffect(() => {
    async function fetchData() {
      scroll.scrollToTop();
      const response = await axios.get(`/query-real-estates`, {
        params: Object.assign({ limit: LIMIT }, { offset: page * LIMIT })
      });
      setRealEstatesData(response.data.rows);
      setTotal(response.data.count);
    }
    setPropertiesLoading(false);
    fetchData().then(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps,
  }, []);

  useEffect(() => {
    async function fetchData() {
      scroll.scrollToTop();
      setPropertiesLoading(true);
      const response = await axios.get(
        `/query-real-estates/?$limit=${LIMIT}&$skip=${page * LIMIT}`,
        {
          params: Object.assign(
            { limit: LIMIT },
            { offset: page * LIMIT },
            currentFilters
          )
        }
      );
      setRealEstatesData(response.data.rows);
      setTotal(response.data.count);
    }
    fetchData().then(() => setPropertiesLoading(false));
  }, [page, currentFilters]);

  const handlePageClick = e => {
    if (e.selected !== page) {
      setPage(e.selected);
    }
  };

  const getImage = property => {
    if (!property.real_estates_imageNames) {
      return `${NoPhoto}`;
    }
    return `${S3_BASE_URL}${property.real_estates_id}/bigPhotos/${
      property.real_estates_imageNames.split(",")[0]
    }`;
  };

  return !loading ? (
    <Container maxWidth="lg" className={classes.container}>
      <Grid container justify="center" className={classes.realEstatesContainer}>
        <Grid container spacing={3} justify="space-around">
          {/* Filters component */}
          <RealEstateFilters setCurrentFilters={setCurrentFilters} />
        </Grid>
        {!propertiesLoading ? (
          realEstatesData.map((property, index) => (
            <Grid key={`property-${index}`} item xs={12} sm={10} md={8}>
              <Paper className={classes.realEstateListItem}>
                <aside>
                  <img src={getImage(property)} alt="" />
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
          ))
        ) : (
          <FullScreenLoader />
        )}
        <Grid item xs={12}>
          <Pagination
            total={total}
            handlePageClick={handlePageClick}
            page={page}
            LIMIT={LIMIT}
          />
        </Grid>
      </Grid>
    </Container>
  ) : (
    <FullScreenLoader />
  );
}

RealEstates.propTypes = {};

export default RealEstates;
