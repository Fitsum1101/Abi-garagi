import React from "react";
import { useLoaderData } from "react-router";
import { getToken } from "../util/token";

const token = getToken();

const Orderdetail = () => {
  const data = useLoaderData();
  console.log(data.order);

  return (
    <div className="bg-gray-100">
      <div className="max-w-[55rem] py-15   mx-auto">
        <div className="mb-4 flex  justify-between ">
          <p className="text-2xl font-semibold  text-blue-950 capitalize">
            {data.order.customerFirstName + " " + data.order.customerLastName}
            <span className="inline-block h-[.2rem] w-[3rem] self-center ml-1 bg-red-500"></span>
          </p>
          <p className="bg-amber-400 justify-center w-26 flex font-semibold items-center h-13 text-center  rounded-4xl">
            {data.order.serviceCompleted === "Inprogress"
              ? "In progress"
              : "completed"}
          </p>
        </div>
        <div className="mb-10 text-gray-400">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum
            quaerat ratione omnis distinctio rerum nihil nulla ipsam totam?
            Adipisci voluptate rerum,
          </p>
        </div>
        <div className="flex pb-6 gap-6">
          <div className="flex flex-col border-b-2 border-red-600 basis-[50%] px-4 pt-5 pb-10 bg-white gap-5">
            <div>
              <span className="uppercase text-[13px] block -mb-1 text-blue-950">
                customer
              </span>
              <h1 className="text-xl font-semibold  text-blue-950 capitalize">
                {data.order.customerFirstName +
                  " " +
                  data.order.customerLastName}
              </h1>
            </div>
            <div>
              <p className="capitalize font-semibold text-blue-950 text-[17px]">
                Email:
                <span className="text-gray-400 inline-block pl-[3px] lowercase">
                  {data.order.customerEmail}
                </span>
              </p>
              <p className="capitalize font-semibold text-blue-950 text-[17px]">
                Phone Number:
                <span className="text-gray-400 inline-block pl-[3px] lowercase">
                  {data.order.customerPhoneNumber}
                </span>
              </p>
              <p className="capitalize font-semibold text-blue-950 text-[17px]">
                Active Cusotmer:
                <span className="text-gray-400 inline-block pl-[3px] lowercase">
                  {data.order.customer_active_status === 1 ? "Yes" : "No"}
                </span>
              </p>
            </div>
          </div>
          <div className="flex flex-col border-b-2 border-red-600 basis-[50%] px-4 pt-5 pb-10 bg-white gap-5">
            <div>
              <span className="uppercase text-[13px] block -mb-1 text-blue-950">
                car in service
              </span>
              <h1 className="text-xl font-semibold  text-blue-950 capitalize">
                {data.order.vehicleModel} ({data.order.vehicleColor})
              </h1>
            </div>
            <div>
              <p className="capitalize font-semibold text-blue-950 text-[17px]">
                Vehicle tag:
                <span className="text-gray-400 inline-block pl-[3px] lowercase">
                  {data.order.vehicleTag}
                </span>
              </p>
              <p className="capitalize font-semibold text-blue-950 text-[17px]">
                Vehicle year:
                <span className="text-gray-400 inline-block pl-[3px] lowercase">
                  {data.order.vehicleYear}
                </span>
              </p>
              <p className="capitalize font-semibold text-blue-950 text-[17px]">
                Vehicle mileage:
                <span className="text-gray-400 inline-block pl-[3px] lowercase">
                  {data.order.vehicleMileage}
                </span>
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white  p-10 ">
          <div className="mb-4">
            <span className="uppercase text-[13px] block -mb-1 text-blue-950">
              {data.order.vehicleModel}
            </span>
            <h1 className="text-2xl font-semibold  text-blue-950 capitalize">
              reuested service
            </h1>
          </div>
          <div className="flex flex-col gap-2">
            {data && data.order && <Services services={data.order.service} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orderdetail;

export const loader = async ({ params }) => {
  const { id } = params;
  try {
    const response = await fetch(`http://localhost:3000/order/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Response("Failed to fetch order details", {
        status: response.status,
        statusText: response.statusText,
      });
    }

    const order = await response.json();
    return order;
  } catch (error) {
    // For network errors or unexpected issues
    throw new Response(
      "An unexpected error occurred while fetching the order.",
      {
        status: 500,
      }
    );
  }
};

const Services = ({ services }) => {
  return services.map((data) => (
    <div
      key={data.service_id}
      className="w-full shadow flex justify-between items-start shadow-gray-300 gap-3 py-3 px-5 "
    >
      <div className="mb-1  flex flex-col justify-between text-[#081336] ">
        <h1 className="capitalize text-2xl font-semibold">
          {data.serviceName}
        </h1>
        <p>{data.serviceDescription}</p>
      </div>
      <div className="bg-amber-400 justify-center w-26 flex font-semibold items-center h-13 text-center  rounded-4xl">
        In progress
      </div>
    </div>
  ));
};
