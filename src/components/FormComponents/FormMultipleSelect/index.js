import React from "react";
import PropTypes from "prop-types";
import Select from "react-select";

function FormMultipleSelect({
  name,
  placeholder,
  className,
  options,
  values,
  onChange,
  isMulti,
  ...rest
}) {
  return (
    <div className={className}>
      <Select
        isMulti={isMulti}
        placeholder={placeholder}
        closeMenuOnSelect={!isMulti}
        name={name}
        options={options}
        value={values}
        classNamePrefix="select"
        onChange={onChange}
        {...rest}
      />
    </div>
  );
}

FormMultipleSelect.propTypes = {
  name: PropTypes.string,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  options: PropTypes.array,
  values: PropTypes.any,
  onChange: PropTypes.func
};

export default FormMultipleSelect;
