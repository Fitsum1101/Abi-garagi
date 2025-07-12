import { useState } from "react";
import {
  data,
  Form,
  redirect,
  useActionData,
  useLoaderData,
  useNavigation,
} from "react-router";
import Input from "../../components/Input/Input";
import { ClipLoader } from "react-spinners";
import { getToken } from "../../util/token";

const EditCustomer = () => {
  const action = useActionData();
  const data = useLoaderData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const [success, setSuccess] = useState(false);
  return (
    <div className="mt-10 mb-20">
      <p className="text-2xl font-semibold mb-6 text-blue-950 capitalize">
        Edit
        <span>
          {data.customer.customer_first_name +
            " " +
            data.customer.customer_last_name}
        </span>
        <span className="inline-block h-[.2rem] w-[3rem] self-center ml-1 bg-red-500"></span>
      </p>
      <Form method="POST" className="flex w-[60%]   flex-col gap-4">
        <div>
          <p>
            Customer email : <span>{data.customer.customer_email}</span>
          </p>
        </div>
        {success && (
          <p className="text-green-600 bg-green-50 border-l-4 border-green-500 px-4 py-2 rounded-md shadow-sm text-sm font-medium">
            updated successfuly
          </p>
        )}
        <div className="w-full flex flex-col gap-4">
          <Input
            type={"text"}
            width={"100%"}
            name={"firstName"}
            placeholder={"first name"}
            defaultValue={data.customer.customer_first_name}
            pl={20}
            py={10}
            serverError={action && action.firstName && action.firstName}
          />
          <Input
            type={"text"}
            width={"100%"}
            name={"lastName"}
            placeholder={"last name"}
            defaultValue={data.customer.customer_last_name}
            pl={20}
            py={10}
            serverError={action && action.lastName && action.lastName}
          />
          <Input
            type={"text"}
            width={"100%"}
            name={"phone"}
            placeholder={"phone number(0900000000)"}
            defaultValue={data.customer.customer_phone_number}
            pl={20}
            py={10}
            serverError={action && action.phone && action.phone}
          />
          <div>
            <input
              type="checkbox"
              className="cursor-pointer"
              defaultChecked={data.customer.active_customer_status}
              name="active"
              id="active"
            />
            <label className="ml-2" htmlFor="active">
              Is active customer
            </label>
          </div>
        </div>
        <button className="self-start cursor-pointer text-center uppercase px-4 text-[14px] py-3 text-white bg-red-600 font-bold">
          update customer
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

export default EditCustomer;

const token = getToken();

export async function loader({ params }) {
  const { id } = params;
  try {
    const response = await fetch(`http://localhost:3000/customer/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      console.log(await response.json());
    }
    const customer = await response.json();
    return customer;
  } catch (error) {
    console.log(error);
    throw new Response("Network error", { status: 500 });
  }
}

export const action = async ({ params, request }) => {
  try {
    const formData = await request.formData();
    const formDatas = Object.fromEntries(formData.entries());
    const { id } = params;
    const error = {};

    for (let input in formDatas) {
      if (input === "firstName") {
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
      customer_phone_number: formDatas.phone,
      customer_first_name: formDatas.firstName,
      customer_last_name: formDatas.lastName,
      active_customer_status: formDatas.active ? 1 : 0,
    };

    const response = await fetch(`http://localhost:3000/customer/${id}`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(toApiData),
    });
    let errorData;
    const serverErrorData = {};
    if (!response.ok) {
      if (response.status === 400) {
        errorData = await response.json();
        errorData = errorData.error;
        if (errorData.name === "customer_first_name") {
          serverErrorData["firstName"] = errorData.msg;
        } else if (errorData.name === "customer_last_name") {
          serverErrorData["lastName"] = errorData.msg;
        } else {
          serverErrorData["phone"] = errorData.msg;
        }
        return data({ ...serverErrorData }, { status: 400 });
      }
    }
    const serverData = await response.json();
    return redirect(`/admin/customers`);
  } catch (error) {
    console.error("Action error:", error);
    return { error: "Submission failed" };
  }
};
