import { useSelector } from "react-redux";
import { selectCurrentToken } from "../Pages/Login/authSlice";
import { useEffect, useState } from "react";
import { useRefreshMutation } from "../Pages/Login/authApiSlice";
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";

const PersistLogin = () => {
  const token = useSelector(selectCurrentToken);

  const [trueSuccess, setTrueSuccess] = useState(false);

  const [
    refresh,
    { data, isUninitialized, isSuccess, isError, isLoading, error },
  ] = useRefreshMutation();

  console.log("TOKEN TESTING", token);

  useEffect(() => {
    const verifyRefreshToken = async () => {
      console.log("Verifying refersh token");

      try {
        await refresh();
      } catch (error) {}
    };

    if (token === null) verifyRefreshToken();
  }, []);

  let content = <Outlet />;

  if (isLoading) {
    content = <div>Loading</div>;
  } else if (isError) {
    content = (
      <div>
        <Link to={"/"}>
          <p>{JSON.stringify(error)}</p>
          <p>Please login again</p>
        </Link>
      </div>
    );
  } else if (isSuccess) {
    content = <Outlet />;
  }

  return content;
};

export default PersistLogin;
