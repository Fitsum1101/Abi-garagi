import React from "react";
import banner from "../../assets/banners/banner1.jpg"; // Adjust the path as necessary
const Banner = ({ activeNav }) => {
  return (
    <div
      className=" bg-cover bg-center h-[50vh] w-full "
      style={{
        backgroundImage: `url('${banner}')`,
      }}
    >
      <div className="flex flex-col pl-4 m-auto h-full    max-w-[60rem]   justify-center text-white">
        <p className="text-[1rem] text-red-500 capitalize flex gap-1">
          home / <span className="text-white">{activeNav}</span>
        </p>
      </div>
    </div>
  );
};

export default Banner;
