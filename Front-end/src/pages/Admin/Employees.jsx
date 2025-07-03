import React, { Suspense } from "react";
import {
  Await,
  Link,
  useActionData,
  useAsyncValue,
  useLoaderData,
} from "react-router-dom";

import EditSquareIcon from "@mui/icons-material/EditSquare";
import DeleteIcon from "@mui/icons-material/Delete";

const Employees = () => {
  const data = useLoaderData();

  return (
    <div className="mt-10 mb-20">
      <p className="text-2xl font-semibold mb-6 text-blue-950 capitalize">
        Employee
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
          <CustomersTable />
        </Await>
      </Suspense>
    </div>
  );
};

export default Employees;

export async function loader() {
  return await fetch("http://localhost:3000/employees", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
}

const CustomersTable = () => {
  const customderData = useAsyncValue();
  console.log(customderData);
  let data = customderData.contacts;
  if (data.length > 0)
    return (
      <div className="overflow-x-auto">
        <table className="min-w-full   border border-amber-600 text-left">
          <thead className="capitalize">
            <tr className="bg-gray-100">
              <th className="pl-2  py-2 text-sm border border-gray-300 font-semibold text-gray-700">
                active
              </th>
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
                <td className="pl-2 py-1 border border-gray-300 ">
                  {row.active_employee === 1 ? "yes" : "no"}
                </td>
                <td className="pl-2 py-2 font-bold border border-gray-300 ">
                  {key + 1}
                </td>
                <td className="pl-2  py-2 border font-bold border-gray-300 ">
                  {row.employee_first_name}
                </td>
                <td className="pl-2  py-2 border font-bold border-gray-300 ">
                  {row.employee_last_name}
                </td>
                <td className="pl-2  py-2 border border-gray-300 ">
                  {row.employee_email}
                </td>
                <td className="pl-2 py-1 border border-gray-300 ">
                  {row.employee_phone}
                </td>
                <td className="pl-2 py-1 border border-gray-300 ">
                  {row.added_date}
                </td>
                <td className="pl-4 py-1 border border-gray-300 ">
                  <div className="flex justify-center items-center gap-2">
                    <Link to={`/admin/employee/edit/${row.employee_id}`}>
                      <EditSquareIcon fontSize="small" />
                    </Link>
                    <Link>
                      <DeleteIcon fontSize="small" />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  else return <h1>no employee data yet</h1>;
};
