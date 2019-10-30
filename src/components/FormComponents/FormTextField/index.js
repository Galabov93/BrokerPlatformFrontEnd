import React, { Fragment } from "react";
import { TextField, Typography } from "@material-ui/core";

export const FormTextField = ({
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

function TextFieldErrorMessage({ name, errors }) {
  return errors[name] ? (
    <Typography color="error">{errors[name]}</Typography>
  ) : (
    <Fragment />
  );
}
