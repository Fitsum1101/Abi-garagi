import React from "react";
import { Outlet } from "react-router";
import Sidbar from "../Admin/Sidbar/Sidbar";
const AdminLayout = () => {
  return (
    <div className="flex flex-row">
      <Sidbar />
      <div className="bg-gray-100 w-full">
        <div className="max-w-[55rem] m-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
