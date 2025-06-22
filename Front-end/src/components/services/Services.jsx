import Singleservice from "./singleService";

export const servicesData = [
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
          <div className=" grid grid-cols-3 gap-3  items-center mt-10">
            {servicesData.map((service, key) => (
              <Singleservice key={key} to={service.to} name={service.name} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
