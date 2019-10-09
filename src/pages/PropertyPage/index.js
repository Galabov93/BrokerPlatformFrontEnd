import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import axios from "../../config/API";
import { makeStyles } from "@material-ui/styles";
import {
  Container,
  Typography,
  Paper,
  Grid,
  Hidden,
  Link
} from "@material-ui/core";
import "react-image-lightbox/style.css";
import Carousel from "../../components/Carousel";

const useStyles = makeStyles(theme => ({
  componentContainer: {
    marginTop: theme.spacing(3)
  },

  heading: {
    padding: theme.spacing(1)
  },
  mobilePhoneNumber: {
    display: "flex",
    alignItems: "center",
    "& a": {
      padding: 8,
      marginTop: 4,
      fontSize: 18
    }
  },
  infoText: {
    fontSize: 18,
    padding: theme.spacing(1),
    "& span": {
      fontWeight: 500
    }
  },
  titleAndPrice: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "baseline",
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
      "& .priceParagraph": {
        fontSize: 20,
        marginTop: theme.spacing(2),
        flexDirection: "row !important",
        alignItems: "center"
      }
    },
    "& h6": {
      [theme.breakpoints.down("sm")]: {
        flexBasis: "70%"
      },
      [theme.breakpoints.up("sm")]: {
        flexBasis: "50%"
      }
    },
    "& .priceParagraph": {
      fontSize: 20,
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-end",
      "& > p": {
        color: theme.fontColor.importantText,
        fontSize: "inherit"
      }
    }
  },
  featuresContainer: {
    marginTop: theme.spacing(2)
  },
  description: {
    padding: theme.spacing(1)
  },
  featuresList: {
    "& li": {
      padding: theme.spacing(1) / 2
    }
  }
}));

function PropertyPage() {
  const classes = useStyles();

  const [realEstatesData, setRealEstatesData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get("/real-estates/1");
      setRealEstatesData(response.data);
    }
    fetchData();
  }, []);

  const images = [
    "https://broker-platfrom-storage-bucket.s3.eu-central-1.amazonaws.com/2c156621419843728/bigPhotos/2c156621419843728_GB",
    "https://via.placeholder.com/250",
    "https://via.placeholder.com/350",
    "https://via.placeholder.com/450",
    "https://via.placeholder.com/550",
    "https://via.placeholder.com/150",
    "https://via.placeholder.com/250",
    "https://via.placeholder.com/350",
    "https://via.placeholder.com/450",
    "https://via.placeholder.com/550"
  ];

  return (
    realEstatesData !== null && (
      <Container className={classes.componentContainer} maxWidth="lg">
        <Grid container justify="center" spacing={4}>
          <Hidden smDown>
            <Grid item xs={12} md={10} className={classes.titleAndPrice}>
              <Typography variant="h6">
                {realEstatesData.real_estates_title.split(",")[0]},
                {realEstatesData.real_estates_city},{" "}
                {realEstatesData.real_estates_address}
              </Typography>

              <div className="priceParagraph">
                <Typography>
                  {realEstatesData.real_estates_original_price}{" "}
                  {realEstatesData.real_estates_currency}
                  <br />
                </Typography>
                <Typography>
                  {realEstatesData.real_estates_price_per_square}
                </Typography>
              </div>
            </Grid>
          </Hidden>

          <Grid item xs={12} md={6}>
            <Carousel images={images} />
          </Grid>

          <Hidden mdUp>
            <Grid item xs={12} className={classes.titleAndPrice}>
              <Typography variant="h6">
                {realEstatesData.real_estates_title}
              </Typography>

              <Typography className="priceParagraph">
                {realEstatesData.real_estates_original_price}{" "}
                {realEstatesData.real_estates_currency} <br />
                <span>{realEstatesData.real_estates_price_per_square}</span>
              </Typography>
            </Grid>
          </Hidden>

          <Grid item xs={12} md={4}>
            <Paper>
              <HeadingText text={"Основна информация"} />

              <Hidden mdUp>
                <div className={classes.mobilePhoneNumber}>
                  <InfoLine attributeText="Телефон" />
                  <Link
                    to={`tel:${realEstatesData.real_estates_seller_phone_number}"`}
                  >
                    {realEstatesData.real_estates_seller_phone_number}
                  </Link>
                </div>
              </Hidden>
              <Hidden smDown>
                <InfoLine
                  attributeText="Телефон"
                  boldText={`${realEstatesData.real_estates_seller_phone_number}`}
                />
              </Hidden>

              <InfoLine
                attributeText="Квадратура"
                boldText={`${realEstatesData.real_estates_size} кв.м`}
              />
              <InfoLine
                attributeText="Вид строителство"
                boldText={`TO BE DONE`}
              />
              <InfoLine
                attributeText="Етаж"
                boldText={realEstatesData.real_estates_floor}
              />
              <InfoLine
                attributeText="Телефон"
                boldText={realEstatesData.real_estates_phone}
              />
              <InfoLine
                attributeText="ТЕЦ"
                boldText={realEstatesData.real_estates_tec}
              />
            </Paper>
            <Hidden smDown>
              <Paper className={classes.featuresContainer}>
                <HeadingText text={"Особености:"} />

                <ul className={classes.featuresList}>
                  {realEstatesData.real_estates_seller_features
                    .split(",")
                    .map((element, index) => (
                      <li key={`element-${index}`}>{element}</li>
                    ))}
                </ul>
              </Paper>
            </Hidden>
          </Grid>

          <Grid item xs={12} md={10} lg={10}>
            <Paper>
              <HeadingText text={"Допълнителна информация"} />

              <Typography className={classes.description}>
                {realEstatesData.real_estates_description}
              </Typography>
            </Paper>
          </Grid>

          <Hidden mdUp>
            <Grid item xs={12} md={6} lg={5}>
              <Paper>
                <HeadingText text={"Особености:"} />

                <ul className={classes.featuresList}>
                  {realEstatesData.real_estates_seller_features
                    .split(",")
                    .map((element, index) => (
                      <li key={`element-${index}`}>{element}</li>
                    ))}
                </ul>
              </Paper>
            </Grid>
          </Hidden>
        </Grid>
      </Container>
    )
  );
}

function HeadingText({ text }) {
  const classes = useStyles();
  return (
    <Typography variant="h5" className={classes.heading}>
      {text}
    </Typography>
  );
}

function InfoLine({ attributeText, boldText }) {
  const classes = useStyles();

  return (
    <Typography className={classes.infoText}>
      {attributeText}: <span>{boldText}</span>
    </Typography>
  );
}

export default withRouter(PropertyPage);
