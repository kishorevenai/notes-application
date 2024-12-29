import { useState } from "react";
import { Link } from "react-router-dom";
import { useSignupMutation } from "./authApiSlice";
import { useNavigate } from "react-router-dom";
import { notification } from "antd";

const Signup = () => {
  const navigate = useNavigate();
  const [api, contextHolder] = notification.useNotification();
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
  });

  const openNotification = (message: string, type: string) => {
    //@ts-ignore
    api[type]({
      message,
    });
  };

  const [signup, { isLoading, isSuccess }] = useSignupMutation();

  const handle_signup = async (e) => {
    e.preventDefault();
    try {
      const data = await signup({
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
      }).unwrap();

      openNotification("Successfully created an account", "success");

      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      openNotification("Unable to create an account", "warning");
    }
  };

  return (
    <div className="h-screen flex justify-center items-center">
      {contextHolder}
      <form
        onSubmit={handle_signup}
        className="border overflow-hidden relative flex flex-col justify-evenly items-center border-black w-3/12 min-w-[400px] h-[300px] rounded-[10px] shadow-xl"
      >
        {isLoading && (
          <div className="absolute z-10 top-0 left-0 w-full h-full bg-slate-400 opacity-20"></div>
        )}
        <p className="text-center font-bold text-[20px]">Sign up</p>
        <p className="text-center font-bold">
          Hey, Enter your details to sign up
        </p>

        <div className="flex justify-between items-center w-10/12 mx-auto">
          <label>Name</label>
          <input
            type="text"
            name="name"
            onChange={(e) =>
              setCredentials((prev) => ({
                ...prev,
                [e.target.name]: e.target.value,
              }))
            }
            placeholder="Name"
            className="border-2 h-[50px] pl-2 rounded-[10px] w-9/12 text-[13px]"
          ></input>
        </div>

        <div className="flex justify-between items-center w-10/12 mx-auto">
          <label>Email</label>
          <input
            type="email"
            name="email"
            onChange={(e) =>
              setCredentials((prev) => ({
                ...prev,
                [e.target.name]: e.target.value,
              }))
            }
            placeholder="Email"
            className="border-2 h-[50px] pl-2 rounded-[10px] w-9/12 text-[13px]"
          ></input>
        </div>

        <div className="flex justify-between items-center w-10/12 mx-auto">
          <label>Password</label>
          <input
            type="password"
            name="password"
            onChange={(e) =>
              setCredentials((prev) => ({
                ...prev,
                [e.target.name]: e.target.value,
              }))
            }
            placeholder="Password"
            className="border-2 h-[50px] pl-2 rounded-[10px] w-9/12 text-[13px]"
          ></input>
        </div>

        <div className="flex justify-between items-center w-11/12">
          <button
            type="submit"
            className="duration-150 border px-3 py-1 rounded-xl hover:bg-prClr hover:text-white"
          >
            Submit
          </button>

          <Link to={"/"}>
            <p className="text-[13px]">Already have an account? Sign in</p>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Signup;
