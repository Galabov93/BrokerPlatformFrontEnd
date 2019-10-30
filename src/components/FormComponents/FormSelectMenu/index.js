import React from "react";
import {
  FormControl,
  InputLabel,
  Select,
  FormHelperText
} from "@material-ui/core";

export const FormSelectMenu = ({
  className,
  selectClassName,
  name,
  label,
  values,
  errors,
  setFieldValue,
  setFieldTouched,
  children,
  ...rest
}) => (
  <FormControl style={{ flexGrow: 1 }} className={className}>
    <InputLabel htmlFor={name}>{label}</InputLabel>
    <Select
      classes={{}}
      className={selectClassName}
      name={name}
      value={values[name]}
      onChange={value => setFieldValue(name, value.target.value)}
      onBlur={() => setFieldTouched(name, true)}
      error={errors[name] ? true : false}
      MenuProps={{
        getContentAnchorEl: null,
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "left"
        }
      }}
      {...rest}
    >
      {children}
    </Select>
    <FormHelperText>{errors[name]}</FormHelperText>
  </FormControl>
);
