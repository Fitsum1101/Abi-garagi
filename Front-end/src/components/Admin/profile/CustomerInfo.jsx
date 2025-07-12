import React, { use } from "react";
import { Link } from "react-router";
import EditSquareIcon from "@mui/icons-material/EditSquare";
import ClearIcon from "@mui/icons-material/Clear";
import { CustomerContext } from "../../../context/customer-context";

const CustomerInfo = ({ email, phone, active, id, firstName, lastName }) => {
  const ctx = use(CustomerContext);
  const handeCloseCustomer = () => {
    ctx.setCustomerData({});
    ctx.setVehicle({});
    ctx.setMechanice({});
  };
  return (
    <div className="p-4 border border-t-0 flex justify-between border-gray-300 bg-white">
      <div>
        <div className="">
          <h1 className="text-2xl capitalize font-semibold text-blue-950">
            <span>{firstName + " " + lastName}</span>
          </h1>
        </div>
        <div className="flex flex-col gap-1 font-bold text-gray-800 capitalize">
          <p>
            Email:
            <span className="text-gray-400 font-semibold ml-1">{email}</span>
          </p>
          <p>
            Phone Number:
            <span className="text-gray-400 font-semibold ml-1">{phone}</span>
          </p>
          <p>
            active customer
            <span className="text-gray-400 font-semibold ml-1">yes</span>
          </p>
          <p>
            Edit customer info
            <span className="ml-2">
              <Link>
                <EditSquareIcon fontSize="medium" sx={{ color: "red" }} />
              </Link>
            </span>
          </p>
        </div>
      </div>
      <div>
        <ClearIcon
          onClick={handeCloseCustomer}
          className="cursor-pointer"
          style={{ color: "red", fontWeight: "bold" }}
          fontSize="large"
        />
      </div>
    </div>
  );
};

export default CustomerInfo;
