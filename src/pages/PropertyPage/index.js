import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import axios from "../../config/API";
import { makeStyles } from "@material-ui/styles";
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
  Image,
  Dot,
  DotGroup
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import {
  Container,
  Typography,
  Paper,
  Grid,
  Hidden,
  Link
} from "@material-ui/core";
import NavigateNext from "@material-ui/icons/NavigateNext";
import NavigateBefore from "@material-ui/icons/NavigateBefore";
import clsx from "clsx";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import { useWidth } from "../../utils/CustomHooks";

const useStyles = makeStyles(theme => ({
  componentContainer: {
    marginTop: theme.spacing(3)
  },
  carousel: {
    position: "relative",
    "& .carousel__image--success": {
      objectFit: "cover"
    },
    "& .carousel__dot-group": {
      position: "absolute",
      bottom: theme.spacing(2),
      width: "100%",
      display: "flex",
      justifyContent: "center",
      flexWrap: "wrap",
      "& button": {
        border: "none",
        color: "white",
        borderRadius: 100,
        backgroundColor: "white",
        padding: theme.spacing(1),
        marginTop: theme.spacing(1),
        marginRight: theme.spacing(1),
        transition: "background-color 300ms ease-in"
      },
      "& .carousel__dot--selected": {
        backgroundColor: "red"
      }
    }
  },
  arrow: {
    [theme.breakpoints.down("sm")]: {
      display: "none"
    },
    position: "absolute",
    top: "calc(50% - 35px)",
    border: "none",
    background: "none",
    outline: 0,
    width: 80,
    height: 80,
    "& svg": {
      width: "100%",
      height: "100%"
    }
  },
  arrowBack: {
    left: 30
  },
  arrowNext: {
    right: 30
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

  const width = useWidth();
  const [realEstatesData, setRealEstatesData] = useState(null);
  const [areCarouselArrowsShowing, setCarouselArrowsShowing] = useState(false);
  const [isLightboxOpen, setLightboxOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

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

          {isLightboxOpen && ["md", "lg", "xl"].includes(width) && (
            <>
              <Lightbox
                mainSrc={images[photoIndex]}
                nextSrc={images[(photoIndex + 1) % images.length]}
                prevSrc={
                  images[(photoIndex + images.length - 1) % images.length]
                }
                onCloseRequest={() => setLightboxOpen(false)}
                onMovePrevRequest={() =>
                  setPhotoIndex(
                    (photoIndex + images.length - 1) % images.length
                  )
                }
                onMoveNextRequest={() =>
                  setPhotoIndex((photoIndex + 1) % images.length)
                }
              />
            </>
          )}
          <Grid item xs={12} md={6}>
            <CarouselProvider
              className={classes.carousel}
              naturalSlideWidth={100}
              naturalSlideHeight={100}
              totalSlides={10}
              onMouseEnter={() => setCarouselArrowsShowing(true)}
              onMouseLeave={() => setCarouselArrowsShowing(false)}
            >
              <Slider>
                {images.map((image, index) => (
                  <Slide key={`carousel-image-${index}`} index={index}>
                    <Image
                      src={`${image}`}
                      hasMasterSpinner="true"
                      onClick={() => {
                        setPhotoIndex(index);
                        setLightboxOpen(true);
                      }}
                    />
                  </Slide>
                ))}
              </Slider>
              <DotGroup></DotGroup>
              {areCarouselArrowsShowing && (
                <>
                  <ButtonBack
                    className={clsx(classes.arrow, classes.arrowBack)}
                  >
                    <NavigateBefore fontSize="large" />
                  </ButtonBack>
                  <ButtonNext
                    className={clsx(classes.arrow, classes.arrowNext)}
                  >
                    <NavigateNext fontSize="large" />
                  </ButtonNext>
                </>
              )}
            </CarouselProvider>
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
