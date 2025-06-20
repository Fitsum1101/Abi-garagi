import React from "react";

const Login = () => {
  return (
    <div className=" max-w-[60rem] mt-10 mb-15 mx-auto">
      <h1 className="text-2xl text-blue-950 mb-8 font-semibold">
        Login to your account
        <span className="bg-red-500 inline-block w-[4rem] h-[.2rem]"></span>
      </h1>
      <div>
        <form action="" className="flex flex-col gap-4">
          <input
            className="border-1 p-2 border-gray-200 w-[60%] placeholder:text-gray-400 placeholder:capitalize placeholder:italic focus:outline-gray-200 "
            type="email"
            name="email"
            placeholder="email"
            id="email"
          />
          <input
            type="password"
            name="password"
            placeholder="password"
            className="border-1 p-2 border-gray-200  w-[60%] placeholder:text-gray-400 placeholder:capitalize placeholder:italic  focus:outline-gray-200 "
            id="password"
          />
          <button
            className="self-start py-3 px-5 mt-4 cursor-pointer  bg-red-500 text-white uppercase font-semibold text-[14px]"
            type="submit"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
