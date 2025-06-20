import banner2 from "../assets/banners/vban1.jpg";
import banner3 from "../assets/banners/vban2.jpg";
import { Link } from "react-router";

const Workshop = () => {
  return (
    <div className=" max-w-[60rem] py-20 flex gap-10 m-auto">
      <div className="flex  flex-col md:flex-row gap-4">
        <div className="w-[225px] ">
          <img src={banner2} alt="Workshop Banner" className="w-full " />
        </div>
        <div className="w-[225px] ">
          <img src={banner3} alt="Workshop Banner" className="w-full " />
        </div>
      </div>
      <div className="flex flex-col justify-center items-start">
        <p className="text-[14px]">Welcom to Our workshop</p>
        <h1 className="text-3xl text-blue-950 font-semibold">
          We have 24 years Exprience
        </h1>
        <div className="flex gap-3 flex-col mt-3">
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Alias,
            ducimus maxime quidem rem obcaecati, omnis officiis nesciunt minus
            neque dolor laudantium aliquid unde amet? Soluta culpa itaque eos
            facilis asperiores.
          </p>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Esse quam,
            atque modi enim rerum iste tempora, voluptas, vitae est in quod
            consequatur. Magni sapiente expedita libero, rem facere assumenda
            harum!
          </p>
        </div>
        <div className="mt-4">
          <button className=" text-white cursor-pointer  bg-red-500 hover:bg-red-700 px-8 py-2 rounded-md  transition duration-300">
            <Link className="uppercase text-[14px] font-semibold">
              About us
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Workshop;
