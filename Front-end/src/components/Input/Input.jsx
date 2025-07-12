import React, { useEffect, useState } from "react";

const Input = ({
  name,
  type,
  placeholder,
  bgColor,
  color,
  defaultValue,
  width,
  height,
  serverError,
}) => {
  const [currentError, setCurrentError] = useState(false);
  const [value, setValue] = useState("");

  useEffect(() => {
    if (defaultValue) {
      setValue(defaultValue);
    }
  }, [defaultValue]);

  useEffect(() => {
    if (serverError) {
      setCurrentError(serverError);
    } else {
      setCurrentError(false);
    }
  }, [serverError]);

  const handelChange = (e) => {
    const { value } = e.target;
    setValue(value);
    if (value.trim().length > 0) {
      if (serverError) {
        setCurrentError(false);
        setPhoneErrorhandling(serverError);
      }
    } else if (value.trim().length === 0) {
      setCurrentError(serverError);
    }
  };

  const onBlurHandler = (e) => {
    if (name === "phone") {
      if (
        currentError === false &&
        e.target.value.trim().length !== 10 &&
        serverError ===
          "Phone number must be exactly 10 digits (e.g., 0927263385)"
      ) {
        setCurrentError(serverError);
      }
    }
  };

  return (
    <div>
      <input
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        defaultValue={defaultValue}
        onChange={handelChange}
        onBlur={onBlurHandler}
        className={` border-1 placeholder:italic focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300 placeholder:text-gray-400 placeholder:capitalize outline-none border-gray-300 ${
          currentError
            ? "border-2 border-red-500 bg-red-50 text-red-600 placeholder-red-400 focus:ring-2 focus:ring-red-300 focus:border-red-500 rounded-md px-4 py-2 text-sm font-medium w-full outline-none"
            : undefined
        }  `}
        style={{
          backgroundColor: bgColor,
          width: width,
          height: height,
          color: color,
          paddingLeft: 10,
          paddingTop: 10,
          paddingBottom: 10,
        }}
      />
      {currentError && (
        <p class="mt-2 text-red-600 bg-red-50 border-l-4 border-red-500 px-4 py-2 rounded-md shadow-sm text-sm font-medium">
          {currentError}
        </p>
      )}
    </div>
  );
};

export default Input;
