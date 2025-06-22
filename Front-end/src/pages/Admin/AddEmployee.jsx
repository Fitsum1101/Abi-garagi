import React from "react";

const AddEmployee = () => {
  return (
    <div className="mt-10 mb-20">
      <p className="text-2xl font-semibold mb-6 text-blue-950 capitalize">
        Add a new employee
        <span className="inline-block h-[.2rem] w-[3rem] self-center ml-1 bg-red-500"></span>
      </p>
      <form className="flex w-[60%]  flex-col gap-6" action="">
        <input
          className="px-4 py-3 border-1  outline-none border-gray-300 bg-white  placeholder:text-gray-300"
          type="email"
          name="email"
          placeholder="Employee email"
          id="email"
        />
        <input
          type="text"
          className="px-4 py-3 outline-none border-1  border-gray-300 bg-white  placeholder:text-gray-300"
          placeholder="Employee first name"
          name="firstName"
          id="firstName"
        />
        <input
          type="text"
          name="lastName"
          placeholder="Employee last name"
          className="px-4 py-3 border-1 outline-none  border-gray-300 bg-white  placeholder:text-gray-300"
          id="lastName"
        />
        <input
          type="text"
          className="px-4 py-3 outline-none border-1  border-gray-300 bg-white  placeholder:text-gray-300"
          placeholder="Employee phone(555-555-5555)"
          name="phone"
          id="phone"
        />
        <input
          type="tel"
          className="px-4 py-3 outline-none border-1  border-gray-300 bg-white  placeholder:text-gray-300"
          placeholder="role (admin, user)"
          name="role"
          id="role"
        />
        <input
          type="password"
          className="px-4 py-3 outline-none border-1  border-gray-300 bg-white  placeholder:text-gray-300"
          placeholder="Password"
          name="password"
          id="password"
        />
        <button className="self-start cursor-pointer text-center uppercase px-4 text-[14px] py-3 text-white bg-red-600 font-bold">
          Add employee
        </button>
      </form>
    </div>
  );
};

export default AddEmployee;
