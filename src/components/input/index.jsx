import React from "react";
import "./style.scss";

const Input = ({ name, label, error, ...rest }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input id={name} name={name} {...rest} />
      {error && <div className="form-group__error-text">{error}</div>}
    </div>
  );
};

export default Input;
