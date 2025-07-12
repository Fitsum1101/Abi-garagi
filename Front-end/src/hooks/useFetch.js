import { useEffect, useState } from "react";
import { getToken } from "../util/token";
const token = getToken();

const useFetch = (url, urlValue) => {
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(undefined);
  console.log(url, urlValue);
  useEffect(() => {
    let ignore = false;
    if (urlValue) {
      const fetchData = async () => {
        console.log("CALLLED FROM ", urlValue);
        try {
          setLoading(true);
          const response = await fetch(url + urlValue, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (!response.ok) {
            throw Error("something want wrong");
          }
          setData(await response.json());
        } catch (error) {
          console.log(error);
          setError(error);
        } finally {
          setLoading(false);
        }
      };
      fetchData();
      return () => {
        ignore = true;
      };
    }
  }, [urlValue]);

  return { data, error, loading };
};

export default useFetch;

//  useEffect(() => {
//     if (isCustomerSeleted) {
//       const fetchData = async () => {
//         try {
//           setSearchLoading(true);
//           const response = await fetch(
//             `http://localhost:3000/vehicles/` +
//               customerCtx.customer.customer_hash,
//             {
//               method: "GET",
//               headers: {
//                 Authorization: `Bearer ${token}`,
//               },
//             }
//           );
//           if (!response.ok) {
//             throw Error("something want wrong");
//           }
//           setSearchLoading(false);
//           const data = await response.json();
//           console.log(data);
//           setVehicle(data);
//         } catch (error) {
//           setError(error);
//           setSearchLoading(false);
//         }
//       };
//       fetchData();
//     }
//   }, [customerCtx.customer]);

//   useEffect(() => {
//     if (searchValue) {
//       const fetchData = async () => {
//         try {
//           setSearchLoading(true);
//           const response = await fetch(
//             `http://localhost:3000/customer/search?query=` + searchValue,
//             {
//               method: "GET",
//               headers: {
//                 Authorization: `Bearer ${token}`,
//               },
//             }
//           );
//           if (!response.ok) {
//             throw Error("something want wrong");
//           }
//           setSearchLoading(false);
//           const data = await response.json();
//           setCustomer(data);
//         } catch (error) {
//           setError(error);
//           setSearchLoading(false);
//         }
//       };
//       fetchData();
//     }
//   }, [searchValue]);
