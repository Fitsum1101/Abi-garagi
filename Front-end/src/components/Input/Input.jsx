import React from "react";

const Input = ({
  type,
  placeholder,
  width,
  padding,
  border,
  bgColor,
  name,
}) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      name={name}
      style={{
        width: width,
        border,
        paddingLeft: padding.x,
        paddingTop: padding.y,
        background: bgColor,
      }}
    />
  );
};

export default Input;
