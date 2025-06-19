import React from "react";
import Home from "./pages/Home";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

//  create me a route that will render the App component

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <div>Error: Page not found</div>,
  },
]);

const App = () => {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
