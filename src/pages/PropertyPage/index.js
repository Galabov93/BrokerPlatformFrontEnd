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
import clsx from "clsx";
import { S3_BASE_URL } from "../../utils/constants";

const useStyles = makeStyles(theme => ({
  componentContainer: {
    marginTop: theme.spacing(3)
  },
  paperContainer: {
    padding: theme.spacing(1)
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
    padding: theme.spacing(1),
    maxWidth: "95%",
    textAlign: "justify"
  },
  featuresList: {
    "& li": {
      padding: theme.spacing(1) / 2
    }
  }
}));

// Title and Price information
function DesktopTitleBar({ realEstatesData, className }) {
  return (
    <Hidden smDown>
      <Grid item xs={12} md={10} className={className}>
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
  );
}

// Title and Price information
function MobileTitleBar({ realEstatesData, className }) {
  console.log("TCL: MobileTitleBar -> realEstatesData", realEstatesData);
  return (
    <Hidden mdUp>
      <Grid item xs={12} className={className}>
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
  );
}

function PropertyPage({ match }) {
  const classes = useStyles();

  const [realEstatesData, setRealEstatesData] = useState(null);
  const [images, setImages] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const response = await axios.get(`/real-estates/${match.params.id}`);
      const formatImages = response.data.real_estates_imageNames
        .split(",")
        .map(
          element =>
            `${S3_BASE_URL}${response.data.real_estates_id}/bigPhotos/${element}`
        );
      setRealEstatesData(response.data);
      setImages(formatImages);
    }
    fetchData().then(() => setLoading(false));
  }, []);

  return (
    !loading && (
      <Container className={classes.componentContainer} maxWidth="lg">
        <Grid container justify="center" spacing={4}>
          <DesktopTitleBar
            realEstatesData={realEstatesData}
            className={classes.titleAndPrice}
          />

          <Grid item xs={12} md={6}>
            <Carousel images={images} />
          </Grid>

          <MobileTitleBar
            realEstatesData={realEstatesData}
            className={classes.titleAndPrice}
          />

          <Grid item xs={12} md={4}>
            <Paper className={classes.paperContainer}>
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
              <Paper
                className={clsx(
                  classes.featuresContainer,
                  classes.paperContainer
                )}
              >
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
            <Paper className={classes.paperContainer}>
              <HeadingText text={"Допълнителна информация"} />

              <Typography className={classes.description}>
                {realEstatesData.real_estates_description}
              </Typography>
            </Paper>
          </Grid>

          <Hidden mdUp>
            <Grid item xs={12} md={6} lg={5}>
              <Paper className={classes.paperContainer}>
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
