import { Link } from "react-router-dom";
import { useLoginMutation } from "../Login/authApiSlice";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { setUserCredentials } from "../Login/authSlice";
import { useDispatch } from "react-redux";
import { notification } from "antd";

const Signin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [api, contextHolder] = notification.useNotification();

  const openNotification = (message: string, type: string) => {
    //@ts-ignore
    api[type]({
      message,
    });
  };

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const [login, { data, isLoading, isSuccess, isError, error }] =
    useLoginMutation();

  const handle_login = async (e: any) => {
    e.preventDefault();

    try {
      const data = await login({
        email: credentials.email,
        password: credentials.password,
      }).unwrap();

      console.log(data);

      dispatch(setUserCredentials({ accessToken: data }));
      navigate("/Notes");
    } catch (error: any) {
      if (error.status === 401) {
        openNotification("Invalid Email and Password", "warning");
      }
    }
  };

  return (
    <div className="h-screen flex justify-center items-center">
      {contextHolder}
      <form
        onSubmit={handle_login}
        className="border flex flex-col justify-evenly items-center border-black w-3/12 min-w-[400px] h-[300px] rounded-[10px] shadow-xl"
      >
        <p className="text-center font-bold text-[20px]">Login</p>
        <p className="text-center font-bold">
          Hey, Enter your details to sign in
        </p>
        <div className="flex justify-between items-center w-10/12 mx-auto">
          <label>Email</label>
          <input
            disabled={isLoading}
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
            required
          ></input>
        </div>

        <div className="flex justify-between items-center w-10/12 mx-auto">
          <label>Password</label>
          <input
            disabled={isLoading}
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
            required
          ></input>
        </div>

        <div className="flex justify-between items-center w-11/12">
          <button
            type="submit"
            disabled={isSuccess}
            className="duration-150 border px-3 py-1 rounded-xl hover:bg-prClr hover:text-white"
          >
            Submit
          </button>

          <Link to={"/Sign up"}>
            <p className="text-[13px]">Dont have an account? Sign Up</p>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Signin;
