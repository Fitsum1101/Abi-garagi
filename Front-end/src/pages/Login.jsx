import React, { useEffect } from "react";
import Input from "../components/Input/Input";
import {
  Form,
  useActionData,
  useNavigate,
  data as actionData,
} from "react-router";
import { useUser } from "../context/login-context";

const Login = () => {
  const action = useActionData();
  console.log(action);
  const navigate = useNavigate();
  const setUser = useUser().setUser;
  useEffect(() => {
    if (action?.token && action?.user) {
      localStorage.setItem("token", action.token);
      setUser(action.user);
      navigate("/admin");
    }
  }, [action, setUser, navigate]);

  return (
    <div className=" max-w-[60rem] mt-10 mb-15 mx-auto">
      <h1 className="text-2xl text-blue-950 mb-8 font-semibold">
        Login to your account
        <span className="bg-red-500 inline-block w-[4rem] h-[.2rem]"></span>
      </h1>
      <div>
        <Form method="POST" className="flex flex-col gap-4">
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
            type={"password"}
            width={"100%"}
            name={"password"}
            placeholder={"password"}
            pl={20}
            py={10}
            serverError={action && action.password && action.password}
          />
          <button
            className="self-start py-3 px-5 mt-4 cursor-pointer  bg-red-500 text-white uppercase font-semibold text-[14px]"
            type="submit"
          >
            Login
          </button>
        </Form>
      </div>
    </div>
  );
};

export default Login;

export async function loginAction({ request }) {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");

  console.log(email, password);

  const errors = {};
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = "Invalid email.";
  }

  if (!password || password.length < 6) {
    errors.password = "Password must be at least 6 chars.";
  }

  if (Object.keys(errors).length > 0) return errors;

  try {
    const res = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        employee_email: email,
        employee_password: password,
      }),
    });

    const data = await res.json();
    const serverErrorData = {};
    if (!res.ok) {
      if (res.status === 400) {
        let errorData = data.error;
        if (errorData.name === "employee_email") {
          serverErrorData["email"] = errorData.msg;
        } else {
          serverErrorData["password"] = errorData.msg;
        }
        return { ...serverErrorData };
      }
    }
    console.log("==============", data);
    return { token: data.token, user: data.employee };
  } catch (error) {
    return { server: error.message };
  }
}
