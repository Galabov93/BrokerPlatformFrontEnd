import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
  Image,
  DotGroup
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import NavigateNext from "@material-ui/icons/NavigateNext";
import NavigateBefore from "@material-ui/icons/NavigateBefore";
import clsx from "clsx";
import Lightbox from "react-image-lightbox";
import { makeStyles } from "@material-ui/core";
import { useWidth } from "../../utils/CustomHooks";

const useStyles = makeStyles(theme => ({
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
      zIndex: 100,
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
    top: 0,
    border: "none",
    background: "none",
    outline: 0,
    width: "30%",
    height: "100%",
    "& svg": {
      width: "100%",
      height: "100%",
      fill: "darkgray"
    }
  },
  arrowBack: {
    left: 0
  },
  arrowNext: {
    right: 0
  }
}));

function Carousel({ images }) {
  const classes = useStyles();
  const width = useWidth();

  const [areCarouselArrowsShowing, setCarouselArrowsShowing] = useState(false);
  const [isLightboxOpen, setLightboxOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  return (
    <div>
      <CarouselProvider
        className={classes.carousel}
        naturalSlideWidth={100}
        naturalSlideHeight={getNaturalHeight(width)}
        totalSlides={images.length}
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
            <ButtonBack className={clsx(classes.arrow, classes.arrowBack)}>
              <NavigateBefore fontSize="large" />
            </ButtonBack>
            <ButtonNext className={clsx(classes.arrow, classes.arrowNext)}>
              <NavigateNext fontSize="large" />
            </ButtonNext>
          </>
        )}
      </CarouselProvider>

      {isLightboxOpen && ["md", "lg", "xl"].includes(width) && (
        <>
          <Lightbox
            style={{ zIndex: 2000 }}
            className="hey"
            mainSrc={images[photoIndex]}
            nextSrc={images[(photoIndex + 1) % images.length]}
            prevSrc={images[(photoIndex + images.length - 1) % images.length]}
            onCloseRequest={() => setLightboxOpen(false)}
            onMovePrevRequest={() =>
              setPhotoIndex((photoIndex + images.length - 1) % images.length)
            }
            onMoveNextRequest={() =>
              setPhotoIndex((photoIndex + 1) % images.length)
            }
          />
        </>
      )}
    </div>
  );
}

Carousel.propTypes = {
  images: PropTypes.array
};

export default Carousel;

function getNaturalHeight(screenWidth) {
  if (screenWidth === "xs") {
    return 100;
  } else if (screenWidth === "sm") {
    return 70;
  } else {
    return 100;
  }
}
