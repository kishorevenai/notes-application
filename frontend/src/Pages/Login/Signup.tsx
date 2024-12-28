import { useState } from "react";
import { Link } from "react-router-dom";
const Signup = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [login, { isLoading, isSuccess, isError, error }] = useLoginMutation();

  const handle_login = async () => {
    try {
      await login({
        email: "",
        password: "",
      }).unwrap();
    } catch (error) {}
  };

  console.log(credentials);

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="border flex flex-col justify-evenly items-center border-black w-3/12 min-w-[400px] h-[300px] rounded-[10px] shadow-xl">
        <p className="text-center font-bold text-[20px]">Login</p>
        <p className="text-center font-bold">
          Hey, Enter your details to sign in
        </p>
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
            onClick={handle_login}
            className="duration-150 border px-3 py-1 rounded-xl hover:bg-prClr hover:text-white"
          >
            Submit
          </button>

          <Link to={"/Sign up"}>
            <p className="text-[13px]">Dont have an account? Sign Up</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
