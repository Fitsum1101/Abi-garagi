import React from "react";
import banner from "../assets/banners/banner1.jpg";
<assetss />;
const QualityAssurance = () => {
  return (
    <div className="bg-red-600 h-[17rem] my-10  text-white">
      <div className=" max-w-[60rem] mx-auto flex gap-3 justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold mb-4">
            Quality service and <br /> customer satisfaction !!
          </h1>
          <p className="text-gray-200">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. A
            obcaecati facilis voluptate nulla maxime doloremque, excepturi
            deleniti tenetur! Aperiam ab itaque eos officiis, praesentium
            necessitatibus laboriosam id inventore perspiciatis accusamus
          </p>
        </div>
        <div className="overflow-hidden basis-[80rem]">
          <img className="h-[17rem]" src={banner} alt="banners" />
        </div>
      </div>
    </div>
  );
};

export default QualityAssurance;
