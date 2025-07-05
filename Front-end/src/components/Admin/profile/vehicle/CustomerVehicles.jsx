import React from "react";
import { Link } from "react-router";
import EditSquareIcon from "@mui/icons-material/EditSquare";

const CustomerVehicle = ({ vehicles }) => {
  return (
    <div>
      <div className="w-full bg-white">
        {vehicles.length <= 0 && (
          <p className="p-2 w-full text-gray-500 ">No vehicle found</p>
        )}
      </div>
      <div className="p-4 border border-t-0 border-gray-300 bg-white">
        {vehicles.length >= 1 &&
          vehicles.map((vehicle, id) => (
            <div>
              <div>
                <h1 className="text-2xl capitalize font-semibold text-blue-950">
                  {vehicle.vehicle_model}
                </h1>
              </div>
              <div className="flex flex-col gap-1 font-bold text-gray-800 capitalize">
                <p>
                  Vehicle color:
                  <span className="text-gray-400 font-semibold ml-1">
                    {vehicle.vehicle_color}
                  </span>
                </p>
                <p>
                  Vehicle tag:
                  <span className="text-gray-400 font-semibold ml-1">
                    {vehicle.vehicle_tag}
                  </span>
                </p>
                <p>
                  Vehicle mileage:
                  <span className="text-gray-400 font-semibold ml-1">
                    {vehicle.vehicle_milage}
                  </span>
                </p>
                <p>
                  Vehicle serial:
                  <span className="text-gray-400 font-semibold ml-1">
                    {vehicle.vehicle_serial}
                  </span>
                </p>
                <p>
                  Edit Vehicle info
                  <span className="ml-2">
                    <Link to={id}>
                      <EditSquareIcon fontSize="medium" sx={{ color: "red" }} />
                    </Link>
                  </span>
                </p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default CustomerVehicle;
