import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import CustomerContextProvider from "./context/customer-context.jsx";
import { UserProvider } from "./context/login-context.jsx";

createRoot(document.getElementById("root")).render(
  <CustomerContextProvider>
    <UserProvider>
      <App />
    </UserProvider>
  </CustomerContextProvider>
);
