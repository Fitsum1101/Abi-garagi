import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import CustomerContextProvider from "./context/customer-context.jsx";

createRoot(document.getElementById("root")).render(
  <CustomerContextProvider>
    <App />
  </CustomerContextProvider>
);
