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
import Customers from "./pages/Admin/Customers";
import { action as customerAction } from "./pages/Admin/Addcustomer";
import { action as employeeAction } from "./pages/Admin/AddEmployee";
import { loader as customerLoader } from "./pages/Admin/Customers";

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
            path: "add-employee",
            element: <AddEmployee />,
            action: employeeAction,
          },
          { path: "customers", element: <Customers />, loader: customerLoader },
        ],
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
