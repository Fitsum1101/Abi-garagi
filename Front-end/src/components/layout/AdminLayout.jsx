import React from "react";
import { Outlet } from "react-router";
import Sidbar from "../Admin/Sidbar/Sidbar";
import { Navigate } from "react-router";
import { useUser } from "../../context/login-context";
const AdminLayout = () => {
  const { user } = useUser();

  if (!user) return <Navigate to={"/login"} />;
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
