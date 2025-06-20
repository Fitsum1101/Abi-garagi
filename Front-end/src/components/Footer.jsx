import React from "react";

import { FaLocationArrow, FaPhone, FaVoicemail } from "react-icons/fa";
import { Link } from "react-router";

const Footer = () => {
  return (
    <div div className="bg-blue-950 w-full  text-white p-4 ">
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
      <div className="max-w-[60rem] m-auto flex justify-between gap-6 pt-10 ">
        <p className="basis-[20rem] mt-11">
          Capitalixe on low hanging fruit hanging fruit to identify a ballpark
          value added activity to beta test.Override the digital divide
          additional clickthroughts
        </p>
        <div className="flex flex-col  gap-4">
          <h3 className="capitalize text-xl font-bold">usefull links</h3>
          <ul className="flex flex-col gap-2">
            <li>
              <Link>Home</Link>
            </li>
            <li>
              <Link>About</Link>
            </li>
            <li>
              <Link>Appointement</Link>
            </li>
            <li>
              <Link>Testimonals</Link>
            </li>
            <li>
              <Link>Contact us</Link>
            </li>
          </ul>
        </div>
        <div className="flex flex-col gap-4">
          <h3 className="capitalize text-xl font-bold">our services</h3>
          <ul className="flex flex-col gap-2">
            <li>
              <Link>Performance upgrade</Link>
            </li>
            <li>
              <Link>Transmission Servie</Link>
            </li>
            <li>
              <Link>Break repair & service</Link>
            </li>
            <li>
              <Link>Engine Service & Repair</Link>
            </li>
            <li>
              <Link>Try & wheels</Link>
            </li>
          </ul>
        </div>
        <div className="flex flex-col gap-4">
          <h3 className=" capitalize text-xl font-bold">Newslatter</h3>
          <p>Get latest updates and offers.</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
