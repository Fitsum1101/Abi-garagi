import banner from "../assets/banners/banner1.jpg";

const Hero = () => {
  return (
    <div
      className=" bg-cover bg-center h-[70vh] w-full "
      style={{
        backgroundImage: `url('${banner}')`,
      }}
    >
      <div className="flex flex-col pl-4 m-auto h-full    max-w-[60rem]   justify-center text-white">
        <p className="text-[1rem]">
          working since 1999
          <span className="inline-block h-[.2rem] w-[3rem] self-center ml-1 bg-red-500"></span>
        </p>
        <h1 className="text-5xl font-bold tracking-normal">
          Tuneup Your Car <br />
          to Next Level
        </h1>
      </div>
    </div>
  );
};

export default Hero;
