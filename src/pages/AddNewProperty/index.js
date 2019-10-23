import React, { Fragment, useRef } from "react";
import { withFormik } from "formik";
import * as Yup from "yup";
import {
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  Container,
  Button,
  FormHelperText,
  Typography,
  Box,
  TextField,
  InputAdornment,
  Checkbox,
  FormControlLabel,
  FormLabel,
  Grid,
  Tooltip,
  Fab
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import {
  neighborhoods,
  realEstateTypes,
  cities,
  features
} from "./form-helpers";
import AddIcon from "@material-ui/icons/Add";

const PropertyFormSchema = Yup.object().shape({
  //   propertySellType: Yup.string().required("Required"),
  // address: Yup.string().required("Required")
  //   lastName: Yup.string()
  //     .min(2, "Too Short!")
  //     .max(50, "Too Long!")
  //     .required("Required"),
  //   email: Yup.string()
  //     .email("Invalid email")
  //     .required("Required")
});

const useStyles = makeStyles(theme => ({
  mainContainer: {
    [theme.breakpoints.down("md")]: {
      paddingLeft: theme.spacing(4),
      paddingRight: theme.spacing(4)
    }
  },
  formRoot: {
    display: "flex",
    flexDirection: "column"
  },

  title: {
    margin: theme.spacing(3),
    textTransform: "uppercase"
  },
  sectionContainer: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    [theme.breakpoints.up("sm")]: {
      flexDirection: "row",
      justifyContent: "space-between"
    }
  },
  featuresContainer: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    "& .checkboxGrid": {
      marginTop: theme.spacing(1),
      display: "grid",
      gridTemplateColumns: "1fr 1fr"
    }
  },
  selectContainer: {
    minWidth: 200
  },
  textField: {
    maxWidth: 200
  },
  description: {
    flexBasis: "100%"
  },
  submitButton: {
    marginTop: theme.spacing(4)
  }
}));

const FormSelectMenu = ({
  className,
  name,
  label,
  values,
  errors,
  setFieldValue,
  setFieldTouched,
  children
}) => (
  <FormControl className={className}>
    <InputLabel htmlFor={name}>{label}</InputLabel>
    <Select
      name={name}
      value={values[name]}
      onChange={value => setFieldValue(name, value.target.value)}
      onBlur={() => setFieldTouched(name, true)}
      error={errors[name] ? true : false}
    >
      {children}
    </Select>
    <FormHelperText>{errors[name]}</FormHelperText>
  </FormControl>
);

const FormTextField = ({
  containerClass,
  textFieldClass,
  name,
  label,
  values,
  errors,
  handleChange,
  handleBlur,
  ...rest
}) => (
  <div className={containerClass}>
    <TextField
      className={textFieldClass}
      label={label}
      name={name}
      value={values[name]}
      onChange={handleChange}
      onBlur={handleBlur}
      error={errors[name] ? true : false}
      {...rest}
    />
    <TextFieldErrorMessage errors={errors} name={name} />
  </div>
);

function AddImageComponent({ values, index, classes, onDrop }) {
  const inputRef = useRef(null);
  const handleChange = (e, index) => {
    // get the files
    let file = e.target.files[0];

    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      // Make a fileInfo Object
      let fileInfo = {
        name: file.name,
        type: file.type,
        size: Math.round(file.size / 1000) + " kB",
        base64: reader.result
      };
      onDrop(fileInfo, index);
    };
  };

  const handleClick = () => {
    inputRef.current.click();
  };

  // eslint-disable-next-line no-eval
  if (eval(`values.images.image${index + 1}`)) {
    const image = eval(`values.images.image${index + 1}`);
    return (
      <div
        className={classes.imageContainer}
        key={`image.name-${index}`}
        cols={1}
      >
        <img src={image.base64} alt={image.name} />
      </div>
    );
  } else {
    return (
      <div className={classes.noImage} cols={1} onClick={handleClick}>
        <input
          ref={inputRef}
          onChange={e => handleChange(e, index)}
          type="file"
        ></input>
        <Tooltip title="Add" aria-label="add">
          <Fab color="primary" className={classes.fab}>
            <AddIcon />
          </Fab>
        </Tooltip>
      </div>
    );
  }
}

const useImageStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    marginTop: theme.spacing(2)
  },
  imageContainer: {
    "& img": {
      width: "100%",
      objectFit: "contain"
    }
  },
  noImage: {
    display: "flex",
    justifyContent: "center",
    "& input": {
      display: "none",
      zIndex: 100,
      width: "100%",
      height: "100%"
    }
  }
}));

export function ImageGridList({ key, values, onDrop, imagesLength }) {
  const classes = useImageStyles();
  const imagesArray = [...Array(imagesLength)];

  return (
    <div className={classes.root}>
      <Typography variant="h4">
        <Box textAlign="center">Добавяне на снимки</Box>
      </Typography>
      <Grid
        className={classes.gridConainer}
        container
        spacing={2}
        justify="center"
      >
        {imagesArray.map((_, index) => {
          return (
            <Grid
              item
              key={`image-${index}`}
              xs={4}
              md={3}
              lg={2}
              className={classes.imageComponentContainer}
            >
              <AddImageComponent
                classes={classes}
                values={values}
                onDrop={onDrop}
                index={index}
              />
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
}

const Form = ({
  values,
  handleBlur,
  setFieldValue,
  setValues,
  setFieldTouched,
  handleChange,
  handleSubmit,
  errors
}) => {
  const classes = useStyles();
  const onDrop = (picture, index) => {
    setFieldValue(`images.image${index + 1}`, picture);
  };
  return (
    <Container className={classes.mainContainer} maxWidth="md">
      <Typography className={classes.title} variant="h4">
        <Box textAlign="center">Добавяне на нов имот</Box>
      </Typography>
      <form className={classes.formRoot} onSubmit={handleSubmit}>
        <section className={classes.sectionContainer}>
          <FormSelectMenu
            className={classes.selectContainer}
            name="propertySellType"
            label="Тип на оферта"
            values={values}
            errors={errors}
            setFieldValue={setFieldValue}
            setFieldTouched={setFieldTouched}
          >
            <MenuItem value={"rent"}>За Наем</MenuItem>
            <MenuItem value={"sell"}>За Продаване</MenuItem>
          </FormSelectMenu>

          <FormSelectMenu
            className={classes.selectContainer}
            name="constructionType"
            label="Вид на имота"
            values={values}
            errors={errors}
            setFieldValue={setFieldValue}
            setFieldTouched={setFieldTouched}
          >
            {realEstateTypes.map((element, index) => {
              return (
                <MenuItem key={`constructionType-${index}}`} value={element}>
                  {element}
                </MenuItem>
              );
            })}
          </FormSelectMenu>
        </section>

        <section className={classes.sectionContainer}>
          <FormSelectMenu
            className={classes.selectContainer}
            name="city"
            label="Населено място"
            values={values}
            errors={errors}
            setFieldValue={setFieldValue}
            setFieldTouched={setFieldTouched}
          >
            {cities.map((element, index) => {
              return (
                <MenuItem key={`cities-${index}}`} value={element}>
                  {element}
                </MenuItem>
              );
            })}
          </FormSelectMenu>

          <FormSelectMenu
            className={classes.selectContainer}
            name="neighborhood"
            label="Квартал"
            values={values}
            errors={errors}
            setFieldValue={setFieldValue}
            setFieldTouched={setFieldTouched}
          >
            {neighborhoods.map((element, index) => {
              return (
                <MenuItem key={`neighborhood-${index}}`} value={element}>
                  {element}
                </MenuItem>
              );
            })}
          </FormSelectMenu>

          <FormTextField
            className={classes.textField}
            label="Адрес"
            name="address"
            values={values}
            handleChange={handleChange}
            handleBlur={handleBlur}
            errors={errors}
          />
        </section>

        <section className={classes.sectionContainer}>
          <FormTextField
            className={classes.textField}
            label="Телефонен номер"
            name="phoneNumber"
            values={values}
            handleChange={handleChange}
            handleBlur={handleBlur}
            errors={errors}
          />

          <FormTextField
            className={classes.textField}
            label="Наем"
            name="price"
            values={values}
            handleChange={handleChange}
            handleBlur={handleBlur}
            errors={errors}
            type="number"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">€</InputAdornment>
              )
            }}
          />

          <FormTextField
            className={classes.textField}
            label="Квадратура"
            name="size"
            values={values}
            handleChange={handleChange}
            handleBlur={handleBlur}
            errors={errors}
            type="number"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">Кв.м</InputAdornment>
              )
            }}
          />
        </section>
        <section className={classes.sectionContainer}>
          <FormSelectMenu
            className={classes.selectContainer}
            name="doesHavePhone"
            label="Телефон"
            values={values}
            errors={errors}
            setFieldValue={setFieldValue}
            setFieldTouched={setFieldTouched}
          >
            <MenuItem value={"ДА"}>ДА</MenuItem>
            <MenuItem value={"НЕ"}>НЕ</MenuItem>
          </FormSelectMenu>

          <FormSelectMenu
            className={classes.selectContainer}
            name="tec"
            label="ТЕЦ"
            values={values}
            errors={errors}
            setFieldValue={setFieldValue}
            setFieldTouched={setFieldTouched}
          >
            <MenuItem value="ДА">ДА</MenuItem>
            <MenuItem value="НЕ">НЕ</MenuItem>
            <MenuItem value="Лок.отопл">Лок.отопл.</MenuItem>
            <MenuItem value="Прокарва се">Прокарва се</MenuItem>
          </FormSelectMenu>

          <FormTextField
            className={classes.textField}
            label="Етаж"
            name="floor"
            values={values}
            handleChange={handleChange}
            handleBlur={handleBlur}
            errors={errors}
            type="number"
          />
          <FormTextField
            className={classes.textField}
            label="Етажност"
            name="floors"
            values={values}
            handleChange={handleChange}
            handleBlur={handleBlur}
            errors={errors}
            type="number"
          />
        </section>

        <section className={classes.sectionContainer}>
          <FormTextField
            containerClass={classes.description}
            label="Допълнителна информация"
            name="description"
            values={values}
            handleChange={handleChange}
            handleBlur={handleBlur}
            errors={errors}
            multiline={true}
            fullWidth={true}
          />
        </section>

        <FormControl component="fieldset" className={classes.featuresContainer}>
          <FormLabel component="legend">Особености</FormLabel>
          <div className="checkboxGrid">
            {features.map((element, index) => {
              const checked = values.checkboxes[element] ? true : false;
              return (
                <FormControlLabel
                  key={`checkbox-${index}`}
                  control={
                    <Checkbox
                      checked={checked}
                      onChange={() => {
                        console.log(values.checkboxes);
                        !checked
                          ? setFieldValue(`checkboxes[${element}]`, element)
                          : setFieldValue(`checkboxes[${element}]`, null);
                      }}
                      value={element}
                      inputProps={{
                        "aria-label": "primary checkbox"
                      }}
                    />
                  }
                  label={element}
                />
              );
            })}
          </div>
        </FormControl>

        <div>
          <ImageGridList
            values={values}
            imagesLength={18}
            onDrop={onDrop}
            tileData={values.images}
          />
        </div>

        <Button
          className={classes.submitButton}
          name="newRealEstate"
          variant="contained"
          color="primary"
          type="submit"
        >
          Submit
        </Button>
      </form>
    </Container>
  );
};

function TextFieldErrorMessage({ name, errors }) {
  return errors[name] ? (
    <Typography color="error">{errors[name]}</Typography>
  ) : (
    <Fragment />
  );
}

const MyEnhancedForm = withFormik({
  mapPropsToValues: () => ({
    propertySellType: "",
    constructionType: "",
    neighborhood: "",
    city: "София",
    address: "",
    price: "",
    size: "",
    floor: "",
    floors: "",
    description: "",
    doesHavePhone: "",
    tec: "",
    phoneNumber: "",
    checkboxes: {},
    images: {
      // image1: "",
      // image2: "",
      // image3: "",
      // image4: "",
      // image5: "",
      // image6: "",
      // image7: "",
      // image8: "",
      // image9: "",
      // image10: "",
      // image11: "",
      // image12: "",
      // image13: "",
      // image14: "",
      // image15: "",
      // image16: "",
      // image17: "",
      // image18: ""
    }
  }),

  // Custom sync validation
  validationSchema: () => PropertyFormSchema,

  handleSubmit: (values, { setSubmitting, errors }) => {
    console.log(values);
    // setSubmitting(false);
    const formatTitle = (sellType, city, neighborhood, constructionType) => {
      // "Дава под Наем 2-СТАЕН, град София, Докторски паметник",
      if (sellType === "rent") {
        return `Дава под Наем ${constructionType}, град ${city}, ${neighborhood}`;
      } else {
        return `Продава ${constructionType}, град ${city}, ${neighborhood}`;
      }
    };

    const getPricePerSquare = (price, size) => {
      const intPrice = parseInt(price);
      const intSize = parseInt(size);

      return parseFloat(intPrice / intSize).toFixed(2);
    };

    const formatFloorString = (floor, floors) => {
      const getBulgarianNumeral = floor => {
        switch (floor) {
          case 1:
            return "-ви";
          case 2:
            return "-ри";
          default:
            return "-ти";
        }
      };

      const numeral = getBulgarianNumeral(floor);

      return `floor${numeral} от ${floors}`;
    };

    const getImageNames = values => {
      return "names";
    };

    const formatFeaturesForDatabase = checkboxes => {
      return Object.values(checkboxes)
        .filter(value => features.includes(value))
        .join(",");
    };

    const postObject = {
      real_estates_id: "2c156544901411455aaaa",
      real_estates_sell_type: values.propertySellType,
      real_estates_construction_type: values.constructionType,
      real_estates_title: formatTitle(
        values.propertySellType,
        values.city,
        values.neighborhood,
        values.constructionType
      ),
      real_estates_neighborhood: values.neighborhood,
      real_estates_city: values.city,
      real_estates_address: `град ${values.city}, ${values.neighborhood}, ${values.address}`,
      real_estates_original_price: parseInt(values.price),
      real_estates_price_in_euro: parseInt(values.price),
      real_estates_currency: "EUR",
      real_estates_price_per_square: `(${getPricePerSquare(
        values.price,
        values.size
      )} EUR/кв.м)`,
      real_estates_price_per_square_in_euro: parseFloat(
        getPricePerSquare(values.price, values.size)
      ),
      real_estates_size: values.size,
      real_estates_floor: formatFloorString(values.floor, values.floors),
      real_estates_tec: values.tec,
      real_estates_phone: values.doesHavePhone,
      real_estates_description: values.description,
      real_estates_imageNames: getImageNames(values),
      real_estates_seller_phone_number: values.phoneNumber,
      real_estates_seller_features: formatFeaturesForDatabase(
        values.checkboxes
      ),
      real_estates_created_by: "Profile",
      real_estates_website_source: "custom"
    };
    // axios.post()
  },

  displayName: "BasicForm"
})(Form);

export default MyEnhancedForm;
