import { createContext, useState } from "react";

export const CustomerContext = createContext({
  setCustomerData: () => {},
  setVehicle: () => {},
  customer: {},
  vhicle: [],
  serviceId: [],
  setServiceId: () => {},
  isServiceSelected: false,
  isOrderSubmit: false,
  setIsOrderSubmit: () => {},
  setMechanice: () => {},
  mechanice: {},
});

const CustomerContextProvider = ({ children }) => {
  const [customer, setCustomer] = useState({});
  const [vhicle, setVehicle] = useState([]);
  const [serviceId, setServiceId] = useState([]);
  const [isOrderSubmit, setIsOrderSubmit] = useState(false);
  const [mechanice, setMechanice] = useState({});
  const isServiceSelected = serviceId.length > 0;

  const data = {
    setCustomerData: (data) => setCustomer(data),
    setVehicle: (data) => setVehicle(data),
    setMechanice: (data) => setMechanice(data),
    setServiceId: (id) =>
      setServiceId((prev) => {
        if (prev.includes(id)) return prev.filter((num) => num !== id);
        return [...prev, id];
      }),
    mechanice,
    customer,
    vhicle,
    serviceId,
    isServiceSelected,
    setIsOrderSubmit: (bool) => setIsOrderSubmit(bool),
    isOrderSubmit,
  };
  return <CustomerContext value={data}>{children}</CustomerContext>;
};

export default CustomerContextProvider;
