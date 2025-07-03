import DeleteIcon from "@mui/icons-material/Delete";
import EditSquareIcon from "@mui/icons-material/EditSquare";
import Input from "../../components/Input/Input";
import { Link, Form, redirect, useLoaderData, Await } from "react-router";
import React from "react";

const Serivce = () => {
  const { services } = useLoaderData();
  return (
    <div className="mt-10 mb-20">
      <p className="text-2xl font-semibold text-blue-950 capitalize">
        Serives
        <span className="inline-block h-[.2rem] w-[3rem] self-center ml-1 bg-red-500"></span>
      </p>
      <p className="mt-3 mb-8 text-[14px] truncate text-gray-400">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum, laborum
        nesciunt fuga culpa deserunt ad eveniet. Quae inventore tempore minus
      </p>
      <div className="mb-2">
        <div className="flex flex-col gap-2">
          <React.Suspense fallback={<p className="bg-pink-600">Loading....</p>}>
            <Await
              resolve={services}
              errorElement={<div>Could not load service datas 😬</div>}
              children={(serivces) => {
                if (serivces.length <= 0)
                  return (
                    <h1 className="align-middle text-center mb-2 capitalize text-xl font-bold text-shadow-blue-950">
                      No services Inserted Yet
                    </h1>
                  );
                {
                  return serivces.map((serv, key) => (
                    <SingleService
                      key={key}
                      description={serv.service_description}
                      title={serv.service_name}
                    />
                  ));
                }
              }}
            />
          </React.Suspense>
        </div>
      </div>
      <NewService />
    </div>
  );
};

const SingleService = ({ title, description }) => {
  return (
    <div className="w-full py-3 px-5 shadow-2xs  shadow-red-800  bg-white">
      <div className="mb-1 text-2xl font-semibold  text-[#081336] ">
        <h1 className="capitalize">{title}</h1>
      </div>
      <div className="flex justify-between items-center">
        <p>{description}</p>
        <div className="flex gap-2">
          <Link>
            <EditSquareIcon sx={{ color: "red" }} />
          </Link>
          <Link>
            <DeleteIcon />
          </Link>
        </div>
      </div>
    </div>
  );
};

const NewService = () => {
  return (
    <div className="bg-white p-10">
      <p className="text-2xl font-semibold mb-5 text-blue-950 capitalize">
        Add new Services
        <span className="inline-block h-[.2rem] w-[3rem] self-center ml-1 bg-red-500"></span>
      </p>
      <Form method="post" className="flex flex-col gap-4">
        <Input
          type={"text"}
          width={"100%"}
          name={"name"}
          placeholder={"service name"}
          pl={20}
          py={10}
        />
        <textarea
          placeholder="servie description"
          name="description"
          id="description"
          className="h-[10rem] border placeholder:italic placeholder:text-gray-400 placeholder:capitalize p-2 border-gray-300"
        ></textarea>
        <button className="self-start cursor-pointer text-center uppercase px-4 text-[14px] py-3 text-white bg-red-600 font-bold">
          Add service
        </button>
      </Form>
    </div>
  );
};

export default Serivce;

export async function action({ request }) {
  const formData = await request.formData();
  const serviceName = formData.get("name");
  const serviceDescription = formData.get("description");
  try {
    const response = await fetch("http://localhost:3000/service", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        service_name: serviceName,
        service_description: serviceDescription,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to submit service");
    }

    return redirect("/admin/services");
  } catch (error) {
    console.error("Error submitting service:", error);
    return { success: false, error: error.message };
  }
}

export async function loader() {
  return await fetch("http://localhost:3000/services");
}
