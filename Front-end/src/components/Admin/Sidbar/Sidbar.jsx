import React from "react";
import { Link } from "react-router-dom";
//  create me an array of objects for the sidbar menu items //  each object should have a title and a link
const menuItems = [
  { title: "Dashboard", link: "/admin" },
  { title: "orders", link: "/admin/orders" },
  { title: "customers", link: "/admin/customers" },
  { title: "New orders", link: "/admin/new-order" },
  { title: "add employee", link: "/admin/add-employee" },
  { title: "add-customers", link: "/admin/add-customer" },
  { title: "services", link: "/admin/services" },
  { title: "employees", link: "/admin/employees" },
];
const Sidbar = () => {
  return (
    <div className="relative">
      <div className="w-[18rem] h-full   text-white">
        <h2 className="text-xl p-4  bg-gray-900 text-gray-500 uppercase">
          Admin menu
        </h2>
        <ul className="capitalize h-full    bg-blue-950 ">
          {menuItems.map((item, index) => (
            <li key={index} className=" px-4 py-3 border-b-1  border-gray-200">
              <Link to={item.link}>{item.title}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidbar;
