import { Link } from "react-router-dom";

import Log from "../assets/icon/logo.png";

//  create me an array of object with the following properties:// name, path, icon, and description
const navItems = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "About",
    path: "/about",
  },
  {
    name: "Services",
    path: "/services",
  },
  {
    name: "Contact",
    path: "/contact",
  },
];

const navs = () => {
  return (
    <ul className="flex gap-4 font-semibold uppercase text-[1rem]">
      {navItems.map((item, index) => (
        <li key={index}>
          <Link to={item.path}>{item.name}</Link>
        </li>
      ))}
    </ul>
  );
};

const Navbar = () => {
  return (
    <>
      <div className="flex justify-between items-center font-semibold bg-blue-950 text-white">
        <div className="flex gap-2  items-center">
          <p className="bg-red-500 p-3">Enko the beso while we fix your car</p>
          <p>Monday Saturday 7:00AM-6:00PM</p>
        </div>
        <div className=" p-3">
          <h2>Welcom Admin</h2>
        </div>
      </div>
      <div className="m-4 flex justify-between items-center text-gray-900 ">
        <div className="w-36">
          <img className="w-full" src={Log} alt="logo" />
        </div>
        <div className="flex items-center justify-between ">
          <nav className="">{navs()}</nav>
          <hr />
          <div className="ml-4">
            <button className="bg-blue-950 font-semibold text-[1rem] text-white px-5 py-2 uppercase  transition duration-300">
              <Link>Log out</Link>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
