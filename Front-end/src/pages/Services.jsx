import React from "react";
import Banner from "../components/banner/Banner";
const Services = () => {
  return (
    <div>
      <Banner activeNav="Services" />
      <div className="p-4">
        <h1 className="text-2xl font-bold">Our Services</h1>
        <p className="mt-2">
          We offer a wide range of services to meet your needs. From web
          development to digital marketing, our team is here to help you
          succeed.
        </p>
      </div>
    </div>
  );
};

export default Services;
