import React from "react";
import { Link } from "react-router";
import EditSquareIcon from "@mui/icons-material/EditSquare";

const CustomerInfo = ({ email, phone, active, id, firstName, lastName }) => {
  return (
    <div>
      <div>
        <div className="mb-3">
          <h1 className="text-2xl font-semibold text-blue-950">
            Customer: <span>{firstName + " " + lastName}</span>
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
    </div>
  );
};

export default CustomerInfo;
