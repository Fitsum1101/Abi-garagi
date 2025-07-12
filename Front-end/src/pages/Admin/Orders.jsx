import React, { Suspense } from "react";
import { Await, Link, useAsyncValue, useLoaderData } from "react-router-dom";

import EditSquareIcon from "@mui/icons-material/EditSquare";
import OpenInFullSharpIcon from "@mui/icons-material/OpenInFullSharp";
import { getToken } from "../../util/token";

const token = getToken();
const Orders = () => {
  const data = useLoaderData();
  return (
    <div className="mt-10 mb-20">
      <p className="text-2xl font-semibold mb-6 text-blue-950 capitalize">
        Orders
        <span className="inline-block h-[.2rem] w-[3rem] self-center ml-1 bg-red-500"></span>
      </p>
      <Suspense
        fallback={
          <h1 className="text-xl text-blue-800 text-center">loading...</h1>
        }
      >
        <Await
          resolve={data}
          errorElement={
            <p className="text-xl text-center text-red-600">
              failed to fetch data
            </p>
          }
        >
          <OrderTable />
        </Await>
      </Suspense>
    </div>
  );
};

export default Orders;

export async function loader() {
  return await fetch("http://localhost:3000/orders", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
}

const OrderTable = () => {
  const orderData = useAsyncValue();

  if (orderData.orders.length > 0)
    return (
      <div className="overflow-x-auto">
        <table className="min-w-full border border-amber-600 text-left">
          <thead className="capitalize">
            <tr className="bg-gray-100">
              <th className="pl-2 py-2 font-bold border border-gray-300 text-gray-700 uppercase">
                ID
              </th>
              <th className="pl-2 py-2 font-bold border border-gray-300 text-gray-700">
                Customer
              </th>
              <th className="pl-2 py-2 font-bold border border-gray-300 text-gray-700">
                Vehicle
              </th>

              <th className="pl-2 py-2 font-bold border border-gray-300 text-gray-700">
                Order Date
              </th>
              <th className="pl-2 py-2 font-bold border border-gray-300 text-gray-700">
                Recived By
              </th>
              <th className="pl-2 py-2 font-bold border border-gray-300 text-gray-700">
                Order status
              </th>
              <th className="pl-2 py-2 font-bold border border-gray-300 text-gray-700">
                edit
              </th>
            </tr>
          </thead>
          <tbody>
            {orderData.orders.map((row, key) => (
              <tr
                key={key}
                className={`${
                  (key + 1) % 2 !== 0 ? "bg-gray-200" : ""
                } capitalize transition text-[16px]`}
              >
                <td className="pl-2 py-2 font-bold border border-gray-300">
                  {row.orderId}
                </td>
                <td className="pl-2 py-2 border font-bold border-gray-300">
                  <div className="flex flex-col gap-1">
                    <p>{row.customerFirstName + " " + row.customerLastName}</p>
                    <p>{row.customerEmail}</p>
                    <p>{row.customerPhoneNumber}</p>
                  </div>
                </td>
                <td className="pl-2 py-2 border border-gray-300">
                  <div className="flex flex-col gap-1">
                    <p>{row.vehicleModel}</p>
                    <p>{row.vehicleTag}</p>
                    <p>{row.vehicleMileage}</p>
                    <p>{row.vehicleYear}</p>
                  </div>
                </td>
                <td className="pl-2 py-2 border border-gray-300">
                  {new Date(row.orderDate).toLocaleDateString()}
                </td>
                <td className="pl-2 py-2 border border-gray-300">
                  {row.employee_first_name}
                </td>
                <td
                  align="center"
                  className="px-2  py-2 border border-gray-300"
                >
                  <p className=" rounded-2xl px-[1px] py-1 font-semibold bg-yellow-400 text-black">
                    {row.serviceCompleted === "Inprogress"
                      ? "In progress"
                      : "completed"}
                  </p>
                </td>
                <td className="pl-2 py-2 border border-gray-300">
                  <div className="flex gap-2">
                    <Link to={`/admin/order/edit/${row.orderHash}`}>
                      <EditSquareIcon fontSize="small" />
                    </Link>
                    <Link to={`/order/details/${row.orderHash}`}>
                      <OpenInFullSharpIcon fontSize="small" className="ml-2" />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  else return <h1>no customer data yet</h1>;
};
