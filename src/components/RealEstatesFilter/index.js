import React from "react";
import SearchIcon from "@material-ui/icons/Search";
import {
  realEstateTypes,
  neighborhoods
} from "../../utils/FormHelpers/form-data";
import FormMultipleSelect from "../../components/FormComponents/FormMultipleSelect";
import { FormTextField } from "../../components/FormComponents/FormTextField";
import { makeStyles } from "@material-ui/styles";
import { withFormik } from "formik";
import { Button } from "@material-ui/core";

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

export const RealEstateFilters = withFormik({
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
