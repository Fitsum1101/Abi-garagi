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
});

const CustomerContextProvider = ({ children }) => {
  const [customer, setCustomer] = useState({});
  const [vhicle, setVehicle] = useState([]);
  const [serviceId, setServiceId] = useState([]);
  const [isOrderSubmit, setIsOrderSubmit] = useState(false);
  const isServiceSelected = serviceId.length > 0;

  const data = {
    setCustomerData: (data) => setCustomer(data),
    setVehicle: (data) => setVehicle(data),
    setServiceId: (id) =>
      setServiceId((prev) => {
        if (prev.includes(id)) return prev.filter((num) => num !== id);
        return [...prev, id];
      }),
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
