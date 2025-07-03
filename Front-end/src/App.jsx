import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./pages/Home";
import Root from "./components/layout/Root";
import About from "./pages/About";
import Services from "./pages/Services";
import ContactAs from "./pages/ContactAs";
import Login from "./pages/Login";
import Admin from "./pages/Admin/Admin";
import AdminLayout from "./components/layout/AdminLayout";
import Addcustomer from "./pages/Admin/Addcustomer";
import AddEmployee from "./pages/Admin/AddEmployee";
import Employees from "./pages/Admin/Employees";
import { loader as employeeLoader } from "./pages/Admin/Employees";
import Customers from "./pages/Admin/Customers";
import { action as customerAction } from "./pages/Admin/Addcustomer";
import { action as customerSearchAction } from "./pages/Admin/Customers";
import { action as addEmployeeAction } from "./pages/Admin/AddEmployee";
import { loader as customerLoader } from "./pages/Admin/Customers";
import EditCustomer from "./pages/Admin/EditCustomer";
import AdminServices from "./pages/Admin/Serivce";
import {
  loader as serviceLoader,
  action as serviceAction,
} from "./pages/Admin/Serivce";
import {
  loader as EditCustomerData,
  action as EditCustomerDataInput,
} from "./pages/Admin/EditCustomer";
import EditEmployee from "./pages/Admin/EditEmployee";
import {
  loader as EditEmployeeloader,
  action as EditEmployeeAction,
} from "./pages/Admin/EditEmployee";
import CustomerProfile from "./pages/Admin/CustomerProfile";

import {
  loader as customerProfileLoader,
  vehicleAction,
} from "./pages/Admin/CustomerProfile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <div>Error: Page not found</div>,
    children: [
      { index: true, element: <Home /> },
      { path: "about", element: <About /> },
      { path: "services", element: <Services /> },
      { path: "contact", element: <ContactAs /> },
      { path: "login", element: <Login /> },
      {
        path: "admin",
        element: <AdminLayout />,
        children: [
          { index: true, element: <Admin /> },
          {
            path: "add-customer",
            element: <Addcustomer />,
            action: customerAction,
          },
          {
            path: "customer/edit/:id",
            element: <EditCustomerData />,
            loader: EditCustomerData,
            action: EditCustomerDataInput,
          },
          {
            path: "customer/profile/:id",
            element: <CustomerProfile />,
            loader: customerProfileLoader,
            action: vehicleAction,
          },
          {
            path: "add-employee",
            element: <AddEmployee />,
            action: addEmployeeAction,
          },
          {
            path: "employees",
            element: <Employees />,
            loader: employeeLoader,
          },
          {
            path: "employee/edit/:id",
            element: <EditEmployee />,
            loader: EditEmployeeloader,
            action: EditEmployeeAction,
          },
          {
            path: "customers",
            element: <Customers />,
            loader: customerLoader,
            action: customerSearchAction,
          },
          {
            path: "services",
            element: <AdminServices />,
            loader: serviceLoader,
            action: serviceAction,
          },
        ],
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
