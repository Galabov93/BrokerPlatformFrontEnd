import React, { useState, useEffect } from "react";
import axios from "../../config/API";
import {
  Container,
  Button,
  Grid,
  Typography,
  Paper,
  Hidden,
  MenuItem
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { animateScroll as scroll } from "react-scroll";
import { FullScreenLoader } from "../../utils/Spinners/FullScreenSpinner";
import Pagination from "../../components/Pagination";
import SearchIcon from "@material-ui/icons/Search";
import { Link } from "react-router-dom";
import { withFormik } from "formik";
import { FormSelectMenu } from "../../components/FormComponents/FormSelectMenu";
import {
  realEstateTypes,
  neighborhoods
} from "../../utils/FormHelpers/form-data";
import FormMultipleSelect from "../../components/FormComponents/FormMultipleSelect";
import { FormTextField } from "../../components/FormComponents/FormTextField";
import API from "../../config/API";

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

const filterStyles = makeStyles(theme => ({
  formContainer: {
    width: "100%",
    margin: `${theme.spacing(2)}px 0 ${theme.spacing(6)}px`,
    maxWidth: 920,
    "& .select-container": {
      flex: 1
    },
    "& button": {
      width: "100%",
      padding: "8px 0",
      marginTop: 16
    }
  },
  selectContainer: {},
  rangesContainer: {
    display: "flex"
  },
  priceAndSizeContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between"
  }
}));

const MyForm = props => {
  const {
    values,
    errors,
    handleChange,
    handleBlur,
    setFieldValue,
    setCurrentFilters
  } = props;
  const classes = filterStyles();

  function formatCollectionForReactSelect(array) {
    return array.map(element => ({
      label: element,
      value: element
    }));
  }

  const offerTypes = [
    { label: "За Наем", value: "rent" },
    { label: "За Продаване", value: "sell" }
  ];

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        setCurrentFilters(values);
      }}
      className={classes.formContainer}
    >
      <div className={classes.priceAndSizeContainer}>
        <div className={classes.rangesContainer}>
          <FormTextField
            className={classes.textField}
            variant="filled"
            label="Цена от"
            name="priceFrom"
            values={values}
            handleChange={handleChange}
            handleBlur={handleBlur}
            errors={errors}
          />
          <FormTextField
            className={classes.textField}
            variant="filled"
            label="Цена от"
            name="priceTo"
            values={values}
            handleChange={handleChange}
            handleBlur={handleBlur}
            errors={errors}
          />
        </div>

        <div className={classes.rangesContainer}>
          <FormTextField
            className={classes.textField}
            variant="filled"
            label="Квадратура от"
            name="sizeFrom"
            values={values}
            handleChange={handleChange}
            handleBlur={handleBlur}
            errors={errors}
          />
          <FormTextField
            className={classes.textField}
            variant="filled"
            label="Квадратура от"
            name="sizeTo"
            values={values}
            handleChange={handleChange}
            handleBlur={handleBlur}
            errors={errors}
          />
        </div>
      </div>
      <div style={{ width: "100%", display: "flex" }}>
        <FormMultipleSelect
          className="select-container"
          name="propertySellType"
          placeholder="Тип оферта"
          values={offerTypes.find(
            element => element.value === values.propertySellType
          )}
          options={offerTypes}
          onChange={element => setFieldValue("propertySellType", element.value)}
        />

        <FormMultipleSelect
          isMulti
          className="select-container"
          name="constructionType"
          placeholder="Вид на имота"
          values={values.constructionType}
          options={formatCollectionForReactSelect(realEstateTypes)}
          onChange={element => setFieldValue("constructionType", element)}
        />

        <FormMultipleSelect
          isMulti
          className="select-container"
          name="neighbourhoods"
          placeholder="Квартали"
          values={values.neighbourhoods}
          options={formatCollectionForReactSelect(neighborhoods)}
          onChange={element => setFieldValue("neighbourhoods", element)}
        />
      </div>

      <Button
        name="search"
        variant="contained"
        color="primary"
        className={classes.button}
        type="submit"
      >
        Търсене
        <SearchIcon className={classes.rightIcon} />
      </Button>
    </form>
  );
};

const MyEnhancedForm = withFormik({
  mapPropsToValues: () => ({
    propertySellType: "",
    constructionType: [],
    neighbourhoods: [],
    priceFrom: "",
    priceTo: "",
    sizeFrom: "",
    sizeTo: ""
  }),
  displayName: "BasicForm"
})(MyForm);
function RealEstates(props) {
  const classes = useStyles();
  const LIMIT = 10;
  const [realEstatesData, setRealEstatesData] = useState(null);
  const [total, setTotal] = useState(null);
  const [page, setPage] = useState(0);

  const [loading, setLoading] = useState(true);
  const [currentFilters, setCurrentFilters] = useState(null);
  console.log("TCL: RealEstates -> currentFilters", currentFilters);

  useEffect(() => {
    async function fetchData() {
      scroll.scrollToTop();
      const response = await axios.get(
        `/real-estates/?$limit=${LIMIT}&$skip=${page * LIMIT}`
      );
      setRealEstatesData(response.data.data);
      setTotal(response.data.total);
    }
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
        <Grid container spacing={3} justify="space-around">
          {/* Filters component */}
          <MyEnhancedForm setCurrentFilters={setCurrentFilters} />
        </Grid>
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
