import { Link } from "react-router";

const Singleservice = ({ name, to }) => {
  return (
    <div className="border-b-3 border-red-500  bg-white  shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="p-4 flex flex-col gap-15 justify-around ">
        <div className=" text-blue-950">
          <p className="uppercase text-[13px]">services and repairs</p>
          <h2 className="capitalize text-2xl">{name}</h2>
        </div>
        <Link
          to={to}
          className="text-red-500 font-semibold text-[13px] uppercase"
        >
          Read more +
        </Link>
      </div>
    </div>
  );
};

export default Singleservice;
