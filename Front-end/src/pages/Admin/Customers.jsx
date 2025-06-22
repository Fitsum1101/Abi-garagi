import React from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import EditSquareIcon from "@mui/icons-material/EditSquare";
import OpenInFullSharpIcon from "@mui/icons-material/OpenInFullSharp";

const rows = [
  {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "555-555-5555",
    addedDate: "2023-01-01",
    action: "View",
    edit: "Edit",
  },
  {
    id: 2,
    firstName: "Jane",
    lastName: "Smith",
    email: "jane.smith@example.com",
    phone: "555-555-5555",
    addedDate: "2023-01-02",
    action: "View",
    edit: "Edit",
  },
  {
    id: 3,
    firstName: "Alice",
    lastName: "Johnson",
    email: "alice.johnson@example.com",
    phone: "555-555-5555",
    addedDate: "2023-01-03",
    action: "View",
    edit: "Edit",
  },
  {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "555-555-5555",
    addedDate: "2023-01-01",
    action: "View",
    edit: "Edit",
  },
  {
    id: 2,
    firstName: "Jane",
    lastName: "Smith",
    email: "jane.smith@example.com",
    phone: "555-555-5555",
    addedDate: "2023-01-02",
    action: "View",
    edit: "Edit",
  },
  {
    id: 3,
    firstName: "Alice",
    lastName: "Johnson",
    email: "alice.johnson@example.com",
    phone: "555-555-5555",
    addedDate: "2023-01-03",
    action: "View",
    edit: "Edit",
  },
];

const Customers = () => {
  return (
    <div className="mt-10 mb-20">
      <p className="text-2xl font-semibold mb-6 text-blue-950 capitalize">
        Add a new customer
        <span className="inline-block h-[.2rem] w-[3rem] self-center ml-1 bg-red-500"></span>
      </p>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="right">First Name</TableCell>
              <TableCell align="right">Last Name</TableCell>
              <TableCell align="right">Email</TableCell>
              <TableCell align="right">Phone</TableCell>
              <TableCell align="right">Added Dates</TableCell>
              <TableCell align="right">Action</TableCell>
              <TableCell align="right">Edit</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, key) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                className={`${
                  (key + 1) % 2 === 0 ? "bg-gray-100" : "bg-white"
                }`}
              >
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell style={{ fontWeight: "bold" }} align="right">
                  {row.firstName}
                </TableCell>
                <TableCell style={{ fontWeight: "bold" }} align="right">
                  {row.lastName}
                </TableCell>
                <TableCell align="right">{row.email}</TableCell>
                <TableCell align="right">{row.phone}</TableCell>
                <TableCell align="right">{row.addedDate}</TableCell>
                <TableCell align="right">{row.action}</TableCell>
                <TableCell align="right">
                  <EditSquareIcon fontSize="small" />
                  <OpenInFullSharpIcon fontSize="small" className="ml-2" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Customers;
