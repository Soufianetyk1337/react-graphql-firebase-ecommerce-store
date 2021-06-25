import React from "react";
import "./ButtonStyle.scss";
function Button({ children, ...otherProps }) {
  return (
    <button className="form-button" {...otherProps}>
      {children}
    </button>
  );
}

export default Button;
