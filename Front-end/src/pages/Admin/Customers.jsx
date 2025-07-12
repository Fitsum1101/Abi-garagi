import React, { Suspense, useState } from "react";
import {
  Await,
  Form,
  Link,
  redirect,
  useActionData,
  useAsyncValue,
  useLoaderData,
} from "react-router-dom";

import EditSquareIcon from "@mui/icons-material/EditSquare";
import OpenInFullSharpIcon from "@mui/icons-material/OpenInFullSharp";
import { getToken } from "../../util/token";

const token = getToken();

const Customers = () => {
  const data = useLoaderData();

  return (
    <div className="mt-10 mb-20">
      <p className="text-2xl font-semibold mb-6 text-blue-950 capitalize">
        Add a new customer
        <span className="inline-block h-[.2rem] w-[3rem] self-center ml-1 bg-red-500"></span>
      </p>
      <Form className="mb-7" method="post">
        <input
          type="search"
          placeholder="Search a customer by firstName ,lastName ,phone numbre or email"
          name="search"
          id="search"
          className="w-full py-3 px-5 text-[17px] placeholder:italic  bg-white border-1 border-gray-300"
        />
      </Form>
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
          <CustomersTable />
        </Await>
      </Suspense>
    </div>
  );
};

export default Customers;

export async function loader() {
  return await fetch("http://localhost:3000/customer", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function action({ request }) {
  const formData = await request.formData();
  const query = formData.get("search");
  if (query.trim().length === 0) {
    return redirect("/admin/customers");
  }
  return await fetch(
    `http://localhost:3000/customer/search?query=${encodeURIComponent(query)}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}

const CustomersTable = () => {
  const customderData = useAsyncValue();
  const searchCustomerData = useActionData();
  const isActionDataExist = searchCustomerData && true;

  let data;
  if (isActionDataExist) {
    data = searchCustomerData.data;
  } else {
    data = customderData.contacts;
  }
  if (data.length > 0)
    return (
      <div className="overflow-x-auto">
        <table className="min-w-full   border border-amber-600 text-left">
          <thead className="capitalize">
            <tr className="bg-gray-100">
              <th className=" pl-2 uppercase  py-2 font-bold border border-gray-300  text-gray-700">
                id
              </th>
              <th className="pl-2 font-bold  py-2 text-sm border border-gray-300  text-gray-700">
                first name
              </th>
              <th className="pl-2 font-bold  py-2 text-sm border border-gray-300  text-gray-700">
                last name
              </th>
              <th className=" pl-2 py-2 text-sm border border-gray-300 font-semibold text-gray-700">
                email
              </th>

              <th className="pl-2  py-2 text-sm border border-gray-300 font-semibold text-gray-700">
                phone number
              </th>
              <th className="pl-2  py-2 text-sm border border-gray-300 font-semibold text-gray-700">
                added date
              </th>
              <th className="pl-2  py-2 text-sm border border-gray-300 font-semibold text-gray-700">
                active
              </th>
              <th className="pl-2  py-2 text-sm border border-gray-300 font-semibold text-gray-700">
                edit
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, key) => (
              <tr
                className={` ${
                  (key + 1) % 2 !== 0 ? "bg-gray-200" : null
                } capitalize transition text-[16px]`}
                key={key}
              >
                <td className="pl-2 py-2 font-bold border border-gray-300 ">
                  {key + 1}
                </td>
                <td className="pl-2  py-2 border font-bold border-gray-300 ">
                  {row.customer_first_name}
                </td>
                <td className="pl-2  py-2 border font-bold border-gray-300 ">
                  {row.customer_last_name}
                </td>
                <td className="pl-2  py-2 border border-gray-300 ">
                  {row.customer_email}
                </td>
                <td className="pl-2 py-1 border border-gray-300 ">
                  {row.customer_phone_number}
                </td>
                <td className="pl-2 py-1 border border-gray-300 ">
                  {row.customer_added_date}
                </td>
                <td className="pl-2 py-1 border border-gray-300 ">
                  {row.active_customer_status === 1 ? "yes" : "no"}
                </td>
                <td className="pl-4 py-1 border border-gray-300 ">
                  <div className="flex gap-2">
                    <Link to={"/admin/customer/edit/" + row.customer_hash}>
                      <EditSquareIcon fontSize="small" />
                    </Link>
                    <Link to={"/admin/customer/profile/" + row.customer_hash}>
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
