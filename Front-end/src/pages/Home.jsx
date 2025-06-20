import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Footer from "../components/Footer";
import Workshop from "../components/Workshop";
import Services from "../components/Services";
import QualityAssurance from "../components/QualityAssurance";
import banner from "../assets/banners/banner1.jpg";

const Home = () => {
  return (
    <div>
      <Hero />
      <Workshop />
      <div className="bg-gray-100">
        <Services />
        <QualityAssurance />
        <div>
          <div className=" mx-auto my-10">
            <div
              className=" bg-cover bg-center h-[45vh] w-full "
              style={{
                backgroundImage: `url('${banner}')`,
              }}
            >
              <div className="flex flex-col pl-4 m-auto h-full max-w-[60rem]  justify-center text-white">
                <p className="text-[1rem]">
                  working since 1999
                  <span className="inline-block h-[.2rem] w-[3rem] self-center ml-1 bg-red-500"></span>
                </p>
                <h1 className="text-5xl font-bold tracking-normal">
                  we are leader in car & <br />
                  mechanic work
                </h1>
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-[60rem] p-8 flex   mx-auto my-10 bg-red-500">
          <div className="flex flex-col justify-center text-white">
            <h1 className="text-2xl font-semibold capitalize">
              Schedure your appointment today
            </h1>
            <p className=" text-gray-100 text-[14px]">
              Your Automotive repair & maintenace service specialist
            </p>
          </div>
          <div className="flex text-white  justify-center items-center ml-auto">
            <p className="text-3xl font-semibold mr-6">1800.456.7890</p>
            <button className="px-7 py-3 cursor-pointer bg-white uppercase  text-black font-semibold text-[13px]">
              contact us
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
