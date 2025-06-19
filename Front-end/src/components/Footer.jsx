import React from "react";

import { FaLocationArrow, FaPhone, FaVoicemail } from "react-icons/fa";

const Footer = () => {
  return (
    <div div className="bg-gray-800 w-full  text-white p-4 ">
      <div className="max-w-[49rem] m-auto flex justify-between items-center pb-4">
        <div className="flex justify-center items-center">
          <FaLocationArrow className="inline-block mr-2" />
          <div className="flex flex-col">
            <p>54B,Tailstoni Town 5238 MT,</p>
            <p>La city,LA 522364</p>
          </div>
        </div>
        <div className="flex justify-center  items-center">
          <FaVoicemail className="inline-block mr-2" />
          <div className="flex flex-col">
            <p>Email us:</p>
            <p>contact@autorex.com</p>
          </div>
        </div>
        <div className="flex justify-center items-center">
          <FaPhone className="inline-block mr-2" />
          <div className="flex flex-col">
            <p>call us on:</p>
            <p>+1800 456 7890</p>
          </div>
        </div>
      </div>
      <hr className="text-gray-600" />
      <div className="min-w-[60rem] "></div>
    </div>
  );
};

export default Footer;
