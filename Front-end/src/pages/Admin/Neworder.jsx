import { Form, Link, useRouteLoaderData, useSubmit } from "react-router";
import PanToolAltIcon from "@mui/icons-material/PanToolAlt";
import { use, useEffect, useState } from "react";
import { CustomerContext } from "../../context/customer-context";
import CustomerInfo from "../../components/Admin/profile/CustomerInfo";
import CustomerVehicle from "../../components/Admin/profile/vehicle/CustomerVehicles";
import Input from "../../components/Input/Input";
const Neworder = () => {
  const [searchValue, setSearchValue] = useState(undefined);
  const [customer, setCustomer] = useState();
  const [vehicle, setVehicle] = useState([]);
  const customerCtx = use(CustomerContext);

  const [error, setError] = useState();
  const [searchLoading, setSearchLoading] = useState(false);

  const isCustomerSeleted = Object.values(customerCtx.customer).length > 0;
  const isVehicleSelected = customerCtx.vhicle.length > 0;

  const handleSearch = (e) => {
    const search = e.target.value;
    if (search.length > 0) setSearchValue(search);
  };

  useEffect(() => {
    if (isCustomerSeleted) {
      const fetchData = async () => {
        try {
          setSearchLoading(true);
          const response = await fetch(
            `http://localhost:3000/vehicles/` +
              customerCtx.customer.customer_hash,
            {
              method: "GET",
            }
          );
          if (!response.ok) {
            throw Error("something want wrong");
          }
          setSearchLoading(false);
          const data = await response.json();
          setVehicle(data);
        } catch (error) {
          setError(error);
          setSearchLoading(false);
        }
      };
      fetchData();
    }
  }, [customerCtx.customer]);

  useEffect(() => {
    if (searchValue) {
      const fetchData = async () => {
        try {
          setSearchLoading(true);
          const response = await fetch(
            `http://localhost:3000/customer/search?query=` + searchValue,
            {
              method: "GET",
            }
          );
          if (!response.ok) {
            throw Error("something want wrong");
          }
          setSearchLoading(false);
          const data = await response.json();
          setCustomer(data);
        } catch (error) {
          setError(error);
          setSearchLoading(false);
        }
      };
      fetchData();
    }
  }, [searchValue]);

  return (
    <div className="p-10">
      <div>
        <p className="text-3xl font-semibold mb-6 text-blue-950 ">
          Create a new order
          <span className="inline-block h-[.2rem] w-[3rem] self-center ml-1 bg-red-500"></span>
        </p>
      </div>
      {!isCustomerSeleted && (
        <div className="flex flex-col gap-4">
          <input
            type="search"
            placeholder="Search a customer by firstName ,lastName ,phone numbre or email"
            name="search"
            id="search"
            onChange={handleSearch}
            className="w-full py-3 px-5 text-[17px] placeholder:italic  bg-white border-1 border-gray-300"
          />
          <Link>
            <button className="self-start cursor-pointer text-center uppercase px-4 text-[14px] py-3 text-white bg-red-600 font-bold">
              Add new Customer
            </button>
          </Link>
        </div>
      )}
      <div className="mb-3">
        {!isCustomerSeleted && customer && customer.data && (
          <CustomerTable data={customer.data} />
        )}
        {isCustomerSeleted && (
          <CustomerInfo
            active={customerCtx.customer.active_customer_status}
            email={customerCtx.customer.customer_email}
            firstName={customerCtx.customer.customer_first_name}
            lastName={customerCtx.customer.customer_last_name}
            // id={id}
            phone={customerCtx.customer.customer_phone_number}
          />
        )}
      </div>
      <div className="mb-3">
        {!isVehicleSelected && vehicle.length > 0 && (
          <div className="px-4 pt-8 pb-8 bg-white">
            <h1 className="text-2xl mb-2 font-semibold text-blue-950">
              Choose a vehicle
            </h1>
            <VheicleTable data={vehicle} />
          </div>
        )}
        {vehicle.length <= 0 && (
          <p className="p-2 w-full text-gray-500 ">No vehicle found</p>
        )}
        {isVehicleSelected && <CustomerVehicle vehicles={customerCtx.vhicle} />}
      </div>
      {isCustomerSeleted && isVehicleSelected && (
        <div className=" ">
          <div className="px-4 border border-t-0  border-gray-300 pt-8 pb-8 mb-3 bg-white flex gap-3 flex-col">
            <div className="flex justify-between font-semibold">
              <h1 className="text-2xl mb-2 font-semibold text-blue-950">
                Choose serivce
              </h1>
            </div>
            <Services />
          </div>
          <div className="border border-t-0 border-gray-300">
            <Order />
          </div>
        </div>
      )}
    </div>
  );
};

export default Neworder;

const CustomerTable = ({ data }) => {
  const customer = use(CustomerContext);

  const handleCustomer = (data) => customer.setCustomerData(data);

  return (
    <table className="w-full">
      <tbody>
        {data.map((row, key) => (
          <tr
            onClick={() => handleCustomer(row)}
            className={`  hover:bg-gray-300 cursor-pointer  ${
              (key + 1) % 2 !== 0 ? "bg-gray-200" : null
            } capitalize transition text-[16px]`}
            key={key}
          >
            <td className="pl-2  py-2 border font-bold border-gray-300 ">
              {row.customer_first_name}
            </td>
            <td className="pl-2  py-2 border font-bold border-gray-300 ">
              {row.customer_last_name}
            </td>
            <td className="pl-2  py-2 border font-bold border-gray-300 ">
              {row.customer_email}
            </td>
            <td className="pl-2  py-2 border font-bold border-gray-300 ">
              {row.customer_phone_number}
            </td>
            <td className="pl-2  py-2 border font-bold border-gray-300 ">
              <PanToolAltIcon />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const VheicleTable = ({ data }) => {
  const customer = use(CustomerContext);
  const handleVehicle = (data) => customer.setVehicle([data]);

  return (
    <table className="w-full">
      <tbody>
        {data.map((row, key) => (
          <tr
            onClick={() => handleVehicle(row)}
            className={`  hover:bg-gray-300 cursor-pointer  ${
              (key + 1) % 2 !== 0 ? "bg-gray-200" : null
            } capitalize transition text-[16px]`}
            key={key}
          >
            <td className="pl-2  py-2 border font-bold border-gray-300 ">
              {row.vehicle_color}
            </td>
            <td className="pl-2  py-2 border font-bold border-gray-300 ">
              {row.vehicle_make}
            </td>
            <td className="pl-2  py-2 border font-bold border-gray-300 ">
              {row.vehicle_mileage}
            </td>
            <td className="pl-2  py-2 border font-bold border-gray-300 ">
              {row.vehicle_model}
            </td>
            <td className="pl-2  py-2 border font-bold border-gray-300 ">
              {row.vehicle_serial}
            </td>
            <td className="pl-2  py-2 border font-bold border-gray-300 ">
              {row.vehicle_tag}
            </td>
            <td className="pl-2  py-2 border font-bold border-gray-300 ">
              {row.vehicle_type}
            </td>
            <td className="pl-2  py-2 border font-bold border-gray-300 ">
              {row.vehicle_year}
            </td>
            <td className="pl-2  py-2 border font-bold border-gray-300 ">
              <PanToolAltIcon />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const Order = () => {
  const [priceErros, setPriceError] = useState();
  const ctx = use(CustomerContext);
  const sumbit = useSubmit();
  const handleForm = (event) => {
    event.preventDefault();
    ctx.setIsOrderSubmit(true);
    const form = event.target;
    const formData = new FormData(form);
    const price = formData.get("price");
    if (price <= 0) {
      return setPriceError(
        "Please enter the product price before adding the order"
      );
    }
    const description = formData.get("description");
  };
  return (
    <div className="bg-white p-10">
      <div className="flex font-bold justify-between">
        <p className="text-2xl font-semibold mb-5 text-blue-950 capitalize">
          additional request
          <span className="inline-block h-[.2rem] w-[3rem] self-center ml-1 bg-red-500"></span>
        </p>
        {ctx.isOrderSubmit && !ctx.isServiceSelected && (
          <p className="text-red-600 text-sm mt-2">
            Please select at least one service before submitting the order.
          </p>
        )}
      </div>

      <form onSubmit={handleForm} method="post" className="flex flex-col gap-4">
        <textarea
          placeholder="Service description"
          name="description"
          id="description"
          className="h-[10rem] focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300 border placeholder:italic placeholder:text-gray-400  p-2 border-gray-300"
        ></textarea>
        <Input
          type={"number"}
          width={"100%"}
          name={"price"}
          placeholder={"price"}
          pl={20}
          py={10}
          serverError={priceErros}
        />
        <button className="self-start cursor-pointer text-center uppercase px-4 text-[14px] py-3 text-white bg-red-600 font-bold">
          Submit Order
        </button>
      </form>
    </div>
  );
};

const Services = () => {
  const { services } = useRouteLoaderData("service");
  const ctx = use(CustomerContext);
  const handleService = (id) => {
    ctx.setIsOrderSubmit(false);
    return ctx.setServiceId(id);
  };
  return services.map((data) => (
    <div
      key={data.service_id}
      className="w-full shadow shadow-gray-300 gap-3 py-3 px-5 "
    >
      <div className="mb-1 text-2xl font-semibold flex justify-between text-[#081336] ">
        <h1 className="capitalize">{data.service_name}</h1>
      </div>
      <div className="flex justify-between items-center">
        <p>{data.service_description}</p>
        <div className="flex gap-2">
          <input
            onClick={() => handleService(data.service_id)}
            className="cursor-pointer w-6 h-6"
            type="checkbox"
            name={"title"}
            id="title"
          />
        </div>
      </div>
    </div>
  ));
};
