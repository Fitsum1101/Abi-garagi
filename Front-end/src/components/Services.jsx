import { Link } from "react-router";

const singleService = (name, to) => {
  return (
    <div className="w-[300px] border-b-3 border-red-500  bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
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
  //   give me an array of objects with name and to properties of my project services
};
const servicesData = [
  { name: "Engine Repair", to: "/services/engine-repair" },
  { name: "Transmission Service", to: "/services/transmission-service" },
  { name: "Brake Repair", to: "/services/brake-repair" },
  { name: "Oil Change", to: "/services/oil-change" },
  { name: "Tire Rotation", to: "/services/tire-rotation" },
  { name: "Suspension Repair", to: "/services/suspension-repair" },
];

const Services = () => {
  return (
    <div className="bg-gray-100 ">
      <div className="max-w-[60rem] m-auto py-20 px-4">
        <div>
          <h1 className="capitalize text-3xl text-blue-950">our Services</h1>
          <p className="mt-2 text-gray-500">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores eum
            impedit iusto dicta blanditiis eius tempora pariatur, quia quidem
            saepe ut excepturi. Esse error, doloremque dignissimos dolore
            ratione tempora asperiores.
          </p>
          <div className="flex  flex-wrap  gap-3  items-center mt-10">
            {servicesData.map((service) =>
              singleService(service.name, service.to)
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
