import { useState, useEffect } from "react";
import { Form, useNavigation, data, useActionData } from "react-router-dom";
import { ClipLoader } from "react-spinners";

import Input from "../../components/Input/Input";

const Addcustomer = () => {
  const action = useActionData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const isSetTimeout = action && action.success && true;
    if (isSetTimeout) {
      setSuccess(() => {
        return action.success;
      });
      const timeoutId = setTimeout(() => {
        setSuccess(false);
      }, 2000);
      return () => {
        if (timeoutId) {
          clearTimeout(timeoutId);
        }
      };
    }
  }, [action]);

  return (
    <div className="mt-10 mb-20">
      <p className="text-2xl font-semibold mb-6 text-blue-950 capitalize">
        Add a new customer
        <span className="inline-block h-[.2rem] w-[3rem] self-center ml-1 bg-red-500"></span>
      </p>
      <Form method="post" className="flex w-[60%]   flex-col gap-4">
        {success && (
          <p className="text-green-600 bg-green-50 border-l-4 border-green-500 px-4 py-2 rounded-md shadow-sm text-sm font-medium">
            customer added successfuly
          </p>
        )}
        <div className="w-full flex flex-col gap-4">
          <Input
            type={"email"}
            width={"100%"}
            name={"email"}
            placeholder={"email"}
            pl={20}
            py={10}
            serverError={action && action.email && action.email}
          />
          <Input
            type={"text"}
            width={"100%"}
            name={"firstName"}
            placeholder={"first name"}
            pl={20}
            py={10}
            serverError={action && action.firstName && action.firstName}
          />
          <Input
            type={"text"}
            width={"100%"}
            name={"lastName"}
            placeholder={"last name"}
            pl={20}
            py={10}
            serverError={action && action.lastName && action.lastName}
          />
          <Input
            type={"text"}
            width={"100%"}
            name={"phone"}
            placeholder={"phone number(0900000000)"}
            pl={20}
            py={10}
            serverError={action && action.phone && action.phone}
          />
        </div>
        <button className="self-start cursor-pointer text-center uppercase px-4 text-[14px] py-3 text-white bg-red-600 font-bold">
          Add customer
        </button>
        {isSubmitting && (
          <ClipLoader
            loading={isSubmitting}
            size={50}
            color="#333"
            aria-label="Loading Spinner"
          />
        )}
      </Form>
    </div>
  );
};

export default Addcustomer;

export const action = async ({ request }) => {
  try {
    const formData = await request.formData();
    const formDatas = Object.fromEntries(formData.entries());

    const error = {};

    for (let input in formDatas) {
      if (input === "email") {
        if (formDatas[input].trim().length === 0)
          error[input] =
            "Please enter a valid email address (e.g., example@domain.com).";
      } else if (input === "firstName") {
        if (
          formDatas[input].trim().length === 0 ||
          /\d/.test(formDatas[input]) === true
        )
          error[input] =
            "First name is required and should only contain letters.";
      } else if (input === "lastName") {
        if (
          formDatas[input].trim().length === 0 ||
          /\d/.test(formDatas[input]) === true
        )
          error[input] =
            "last name is required and should only contain letters.";
      } else if (input === "phone") {
        if (/[a-zA-Z]/.test(formDatas[input]) === true) {
          error[input] = "Please enter valid phone number (e.g., 0927263385).";
        } else if (
          formDatas[input].length > 10 ||
          formDatas[input].length < 10
        ) {
          error[input] =
            "Phone number must be exactly 10 digits (e.g., 0927263385)";
        } else if (formDatas[input].slice(0, 2) !== "09") {
          error[input] = "phone number needs to start with 09";
        }
      }
    }

    if (Object.keys(error).length > 0) {
      return data({ ...error }, { status: 400 });
    }

    const toApiData = {
      customer_email: formDatas.email,
      customer_phone_number: formDatas.phone,
      customer_first_name: formDatas.firstName,
      customer_last_name: formDatas.lastName,
    };

    const response = await fetch("http://localhost:3000/customer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(toApiData),
    });

    let errorData;
    const serverErrorData = {};
    if (!response.ok) {
      if (response.status === 400) {
        errorData = await response.json();
        errorData = errorData.error;
        if (errorData.name === "customer_email") {
          serverErrorData["email"] = errorData.msg;
        } else if (errorData.name === "customer_first_name") {
          serverErrorData["firstName"] = errorData.msg;
        } else if (errorData.name === "customer_last_name") {
          serverErrorData["lastName"] = errorData.msg;
        } else {
          serverErrorData["phone"] = errorData.msg;
        }
        console.log(serverErrorData);
        return data({ ...serverErrorData }, { status: 400 });
      }
    }
    const serverData = await response.json();
    return data({ ...serverData }, { status: 201 });
  } catch (error) {
    console.error("Action error:", error);
    return { error: "Submission failed" };
  }
};
