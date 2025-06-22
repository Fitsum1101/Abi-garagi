import React from "react";
import Sidbar from "../../components/Admin/Sidbar/Sidbar";
import { servicesData } from "../../components/services/Services";
import Singleservice from "../../components/services/singleService";
const Admin = () => {
  return (
    <div className="mt-10 mb-20">
      <p className="text-2xl font-semibold text-blue-950 capitalize">
        Admin Dashboard
        <span className="inline-block h-[.2rem] w-[3rem] self-center ml-1 bg-red-500"></span>
      </p>
      <p className="mt-3 mb-8 text-[14px] text-gray-400">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum, laborum
        nesciunt fuga culpa deserunt ad eveniet. Quae inventore tempore minus
        perferendis tenetur, consequatur dolorem ipsa labore, ipsam voluptatibus
        provident nostrum!
      </p>
      <div className="grid grid-cols-3 gap-4">
        {servicesData.map((serivce, key) => (
          <Singleservice key={key} name={serivce.name} to={serivce.to} />
        ))}
      </div>
    </div>
  );
};

export default Admin;
