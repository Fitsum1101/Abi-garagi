import React, { Suspense } from "react";
import { Await, Link, useAsyncValue, useLoaderData } from "react-router-dom";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import EditSquareIcon from "@mui/icons-material/EditSquare";
import OpenInFullSharpIcon from "@mui/icons-material/OpenInFullSharp";

const Customers = () => {
  const data = useLoaderData();
  return (
    <div className="mt-10 mb-20">
      <p className="text-2xl font-semibold mb-6 text-blue-950 capitalize">
        Add a new customer
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

export default Customers;

export async function loader() {
  return await fetch("http://localhost:3000/customer", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
}

const CustomersTable = () => {
  const customderData = useAsyncValue();
  if (customderData.contacts.length > 0)
    return (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="left">First Name</TableCell>
              <TableCell align="left">Last Name</TableCell>
              <TableCell align="left">Email</TableCell>
              <TableCell align="left">Phone</TableCell>
              <TableCell align="left">Added Dates</TableCell>
              <TableCell align="left">Action</TableCell>
              <TableCell align="left">Edit</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customderData.contacts.map((row, key) => (
              <TableRow
                key={key + 1}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  padding: 0,
                }}
                className={`${
                  (key + 1) % 2 === 0 ? "bg-gray-100" : "bg-white"
                }`}
              >
                <TableCell component="th" scope="row">
                  {key + 1}
                </TableCell>
                <TableCell style={{ fontWeight: "bold" }} align="left">
                  {row.customer_first_name}
                </TableCell>
                <TableCell style={{ fontWeight: "bold" }} align="left">
                  {row.customer_last_name}
                </TableCell>
                <TableCell align="left">{row.customer_email}</TableCell>
                <TableCell align="left">{row.customer_phone_number}</TableCell>
                <TableCell align="left">{row.customer_added_date}</TableCell>
                <TableCell align="left">{row.active_customer_status}</TableCell>
                <TableCell align="left">
                  <div className="flex gap-2">
                    <Link>
                      <EditSquareIcon fontSize="small" />
                    </Link>
                    <Link>
                      <OpenInFullSharpIcon fontSize="small" className="ml-2" />
                    </Link>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  else return <h1>no customer data yet</h1>;
};
//  "customer_id": 1,
//             "customer_email": "test@test.com",
//             "customer_phone_number": "555-555-5555",
//             "customer_first_name": "Test",
//             "customer_last_name": "Test",
//             "customer_hash": "khsdgfkujhkjnfdfg7763hdff",
//             "active_customer_status": 1,
//             "customer_added_date": "2016-11-28T14:10:11.338Z"
