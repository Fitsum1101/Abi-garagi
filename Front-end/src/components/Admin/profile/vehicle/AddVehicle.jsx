import React, { useEffect, useState } from "react";
import { Link, Form, useActionData } from "react-router";
import Input from "../../../Input/Input";
import CloseIcon from "@mui/icons-material/Close";

const AddVehicle = ({ handleColse }) => {
  const action = useActionData();
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const isSetTimeout = action && action.success && true;
    if (isSetTimeout) {
      setSuccess(() => {
        return action.success;
      });
      const timeoutId = setTimeout(() => {
        setSuccess(false);
      }, 2000);
      return () => {
        if (timeoutId) {
          clearTimeout(timeoutId);
        }
      };
    }
  }, [action]);

  const serverError = action && action.errors;
  const setDefaultValue = action && action.success;

  return (
    <div className="bg-white relative my-10 p-10">
      <span
        onClick={handleColse}
        className="absolute px-1 py-1 bg-red-500 cursor-pointer right-0 -top-8"
      >
        <CloseIcon fontSize="medium" sx={{ color: "white", fontWeight: 500 }} />
      </span>
      <p className="text-2xl font-semibold mb-6 text-blue-950 capitalize">
        Add a vehicle
        <span className="inline-block h-[.2rem] w-[3rem] self-center ml-1 bg-red-500"></span>
      </p>
      <div>
        <Form method="POST" className="flex  flex-col gap-4">
          {success && (
            <p className="text-green-600 bg-green-50 border-l-4 border-green-500 px-4 py-2 rounded-md shadow-sm text-sm font-medium">
              customer added successfuly
            </p>
          )}
          <Input
            type={"text"}
            width={"100%"}
            name={"year"}
            placeholder={"vehicle year"}
            defaultValue={setDefaultValue}
            serverError={
              serverError &&
              action.errors.vehicle_year &&
              action.errors.vehicle_year
            }
          />
          <Input
            type={"text"}
            width={"100%"}
            name={"make"}
            placeholder={"vehicle make"}
            defaultValue={setDefaultValue}
            serverError={
              serverError &&
              action.errors.vehicle_make &&
              action.errors.vehicle_make
            }
          />
          <Input
            type={"text"}
            width={"100%"}
            name={"model"}
            placeholder={"vehicle model"}
            defaultValue={setDefaultValue}
            serverError={
              serverError &&
              action.errors.vehicle_model &&
              action.errors.vehicle_model
            }
          />
          <Input
            type={"text"}
            width={"100%"}
            name={"type"}
            placeholder={"vehicle type"}
            defaultValue={setDefaultValue}
            serverError={
              serverError &&
              action.errors.vehicle_type &&
              action.errors.vehicle_type
            }
          />
          <Input
            type={"text"}
            width={"100%"}
            name={"mileage"}
            placeholder={"vehicle mileage"}
            defaultValue={setDefaultValue}
            serverError={
              serverError &&
              action.errors.vehicle_mileage &&
              action.errors.vehicle_mileage
            }
          />
          <Input
            type={"text"}
            width={"100%"}
            name={"tag"}
            placeholder={"vehicle tag"}
            defaultValue={setDefaultValue}
            serverError={
              serverError &&
              action.errors.vehicle_tag &&
              action.errors.vehicle_tag
            }
          />
          <Input
            type={"text"}
            width={"100%"}
            name={"serial"}
            placeholder={"vehicle serial"}
            defaultValue={setDefaultValue}
            serverError={
              serverError &&
              action.errors.vehicle_serial &&
              action.errors.vehicle_serial
            }
          />
          <Input
            type={"text"}
            width={"100%"}
            name={"color"}
            placeholder={"vehicle color"}
            defaultValue={setDefaultValue}
            serverError={
              serverError &&
              action.errors.vehicle_color &&
              action.errors.vehicle_color
            }
          />
          <div>
            <button className="self-start cursor-pointer text-center uppercase px-4 text-[14px] py-3 text-white bg-red-600 font-bold">
              Add vehicle
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default AddVehicle;
