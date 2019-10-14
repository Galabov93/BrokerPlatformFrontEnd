import React, { useState, Fragment } from "react";
import { withFormik, FieldArray } from "formik";
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
  FormLabel
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import {
  neighborhoods,
  realEstateTypes,
  cities,
  features
} from "./form-helpers";

const PropertyFormSchema = Yup.object().shape({
  //   propertySellType: Yup.string().required("Required"),
  address: Yup.string().required("Required")
  //   lastName: Yup.string()
  //     .min(2, "Too Short!")
  //     .max(50, "Too Long!")
  //     .required("Required"),
  //   email: Yup.string()
  //     .email("Invalid email")
  //     .required("Required")
});

// real_estates_id  -- NOT SHOWING IN FRONT END ONLY SUBMITING
// real_estates_title --- STRING - generate from  selltype, construction-type, neighboorhood
// real_estates_sell_type -- SELECT
// real_estates_construction_type -- SELECT -- 2-STAEN ETC
// real_estates_neighborhood --- SELECT

// real_estates_city --- SELECT
// real_estates_address -- STRING  -> done

// real_estates_original_price --- ONLY EURO TEXT FIELD WITH NUMBER
// real_estates_price_in_euro -- AUTO- CALCULATE
// real_estates_currency  ---> default euro
// real_estates_price_per_square  --> auto calculate
// real_estates_price_per_square_in_euro ---> same as above
// real_estates_size --> done
// real_estates_floor
// real_estates_tec
// real_estates_phone
// real_estates_description
// real_estates_imageNames
// real_estates_seller_phone_number
// real_estates_seller_features
// real_estates_created_by

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
      justifyContent: "space-around"
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
    city: "",
    address: "",
    price: 0,
    size: 0,
    floor: 0,
    floors: 0,
    description: "",
    checkboxes: {}
  }),

  // Custom sync validation
  validationSchema: () => PropertyFormSchema,

  handleSubmit: (values, { setSubmitting, errors }) => {
    console.log(values);
    // setSubmitting(false);
    console.log("TCL: errors", errors);
    // if (!errors) {
    // } else {
    //   console.log("Errors", errors);
    //   console.log(values);
    // }
  },

  displayName: "BasicForm"
})(Form);

export default MyEnhancedForm;
