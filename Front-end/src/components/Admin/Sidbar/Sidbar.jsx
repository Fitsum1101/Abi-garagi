import React from "react";
import { Link } from "react-router-dom";
import { useUser } from "../../../context/login-context";

const Sidbar = () => {
  const { user } = useUser();
  return (
    <div className="relative">
      <div className="w-[18rem] h-full   text-white">
        <h2 className="text-xl p-4  bg-gray-900 text-gray-500 uppercase">
          Admin menu
        </h2>
        <ul className="capitalize h-full  bg-blue-950 ">
          <li className=" px-4 py-3 border-b-1  border-gray-200">
            <Link to={"/admin"}>Dashboard</Link>
          </li>
          <li className=" px-4 py-3 border-b-1  border-gray-200">
            <Link to={"/admin/orders"}>orders</Link>
          </li>
          {user.role !== "EMPLOYEE" && (
            <>
              <li className=" px-4 py-3 border-b-1  border-gray-200">
                <Link to={"/admin/customers"}>customers</Link>
              </li>
              <li className=" px-4 py-3 border-b-1  border-gray-200">
                <Link to={"/admin/new-order"}>New orders</Link>
              </li>
              <li className=" px-4 py-3 border-b-1  border-gray-200">
                <Link to={"/admin/add-employee"}>add employee</Link>
              </li>
              <li className=" px-4 py-3 border-b-1  border-gray-200">
                <Link to={"/admin/services"}>services</Link>
              </li>
              <li className=" px-4 py-3 border-b-1  border-gray-200">
                <Link to={"/admin/employees"}>employees</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Sidbar;
