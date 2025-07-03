import { useState } from "react";
import CustomerInfo from "../../components/Admin/profile/CustomerInfo";
import CustomerVehicle from "../../components/Admin/profile/vehicle/CustomerVehicles";
import AddVehicle from "../../components/Admin/profile/vehicle/AddVehicle";
import Orders from "../../components/Admin/orders/Orders";
import { useLoaderData, useParams } from "react-router";

const CustomerProfile = () => {
  const [close, setClose] = useState(true);
  const { customer, vehicles } = useLoaderData();
  const { id } = useParams();

  return (
    <div className="border-l   border-gray-400">
      <div className="flex gap-5">
        <h1 className="w-20 h-20  -ml-10 rounded-full text-white font-semibold text-2xl capitalize bg-red-500 flex items-center justify-center">
          info
        </h1>
        <CustomerInfo
          active={customer.customer.active_customer_status}
          email={customer.customer.customer_email}
          firstName={customer.customer.customer_first_name}
          lastName={customer.customer.customer_last_name}
          id={id}
          phone={customer.customer.customer_phone_number}
        />
      </div>
      <div className="mt-5 flex gap-5">
        <div>
          <h1 className="w-20 h-20 -ml-10 rounded-full text-white font-semibold text-2xl capitalize bg-red-500 flex items-center justify-center">
            cars
          </h1>
        </div>
        <div className="flex w-full flex-col gap-5">
          <div className="w-full">
            <CustomerVehicle vehicles={vehicles} />
          </div>
          {!close && <AddVehicle handleColse={() => setClose(true)} />}
          {close && (
            <button
              onClick={() => setClose(false)}
              className="self-start cursor-pointer text-center uppercase px-4 text-[14px] py-3 text-white bg-red-600 font-bold"
            >
              Add employee
            </button>
          )}
        </div>
      </div>
      <div className="flex mt-5  gap-3">
        <div>
          <h1 className="w-20 h-20 -ml-10 rounded-full text-white font-semibold text-xl capitalize bg-red-500 flex items-center justify-center">
            orders
          </h1>
        </div>
        <div>
          <Orders />
        </div>
      </div>
    </div>
  );
};

export default CustomerProfile;

// loaders/customerLoader.js
export async function loader({ params }) {
  const id = params.id;

  try {
    const [customerRes, vehiclesRes] = await Promise.all([
      fetch(`http://localhost:3000/customer/${id}`),
      fetch(`http://localhost:3000/vehicles/` + id),
    ]);

    if (!customerRes.ok || !vehiclesRes.ok) {
      throw new Error("Failed to load customer or vehicle data");
    }

    const customer = await customerRes.json();
    const vehicles = await vehiclesRes.json();

    console.log(vehicles);

    return { customer, vehicles };
  } catch (error) {
    console.error("Loader error:", error);
    throw new Response("Error loading customer data", {
      status: 500,
      statusText: error.message,
    });
  }
}

export async function vehicleAction({ params, request }) {
  const formData = await request.formData();
  const customer_id = params.id;
  const payload = {
    customer_id,
    vehicle_year: formData.get("year"),
    vehicle_make: formData.get("make"),
    vehicle_model: formData.get("model"),
    vehicle_type: formData.get("type"),
    vehicle_mileage: formData.get("mileage"),
    vehicle_tag: formData.get("tag"),
    vehicle_serial: formData.get("serial"),
    vehicle_color: formData.get("color"),
  };

  const errors = {};

  if (!/^\d{4}$/.test(payload.vehicle_year))
    errors.vehicle_year = "Invalid year format";
  if (!payload.vehicle_make) errors.vehicle_make = "Vehicle make is required";
  if (!payload.vehicle_model)
    errors.vehicle_model = "Vehicle model is required";
  if (!payload.vehicle_type) errors.vehicle_type = "Vehicle type is required";
  if (!/^\d+$/.test(payload.vehicle_mileage))
    errors.vehicle_mileage = "Mileage must be a number";
  if (!payload.vehicle_tag) errors.vehicle_tag = "Vehicle tag is required";
  if (!payload.vehicle_serial)
    errors.vehicle_serial = "Vehicle serial is required";
  if (!payload.vehicle_color)
    errors.vehicle_color = "Vehicle color is required";

  if (Object.keys(errors).length > 0) {
    return { success: false, errors };
  }
  try {
    const response = await fetch("http://localhost:3000/vehicle", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...payload }),
    });

    if (!response.ok) {
      throw new Error("Failed to save vehicle");
    }

    return { success: true, message: "Vehicle saved successfully" };
  } catch (err) {
    return { success: false, message: err.message };
  }
}
