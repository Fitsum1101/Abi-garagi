import React from "react";
import Input from "../../components/Input/Input";

//

const Addcustomer = () => {
  return (
    <div className="mt-10 mb-20">
      <p className="text-2xl font-semibold mb-6 text-blue-950 capitalize">
        Add a new customer
        <span className="inline-block h-[.2rem] w-[3rem] self-center ml-1 bg-red-500"></span>
      </p>
      <form className="flex w-[60%]  flex-col gap-6" action="">
        <input
          className="px-4 py-3 border-1 italic outline-none border-gray-300 bg-white  placeholder:text-gray-300"
          type="email"
          name="email"
          placeholder="Customer email"
          id="email"
        />
        <input
          type="text"
          className="px-4 py-3 outline-none border-1 italic border-gray-300 bg-white  placeholder:text-gray-300"
          placeholder="Customer first name"
          name="firstName"
          id="firstName"
        />
        <input
          type="text"
          name="lastName"
          placeholder="Customer last name"
          className="px-4 py-3 border-1 outline-none italic border-gray-300 bg-white  placeholder:text-gray-300"
          id="lastName"
        />
        <input
          type="text"
          className="px-4 py-3 outline-none border-1 italic border-gray-300 bg-white  placeholder:text-gray-300"
          placeholder="Customer phone(555-555-5555)"
          name="phone"
          id="phone"
        />
        <button className="self-start cursor-pointer text-center uppercase px-4 text-[14px] py-3 text-white bg-red-600 font-bold">
          Add customer
        </button>
      </form>
    </div>
  );
};

export default Addcustomer;
