import { useSelector } from "react-redux";
import { selectCurrentToken } from "../Pages/Login/authSlice";
import { useEffect, useState } from "react";
import { useRefreshMutation } from "../Pages/Login/authApiSlice";
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";

const PersistLogin = () => {
  const token = useSelector(selectCurrentToken);

  const [
    refresh,
    { data, isUninitialized, isSuccess, isError, isLoading, error },
  ] = useRefreshMutation();

  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (error) {
        console.log(error);
      }
    };

    if (!token && isUninitialized) verifyRefreshToken();
  }, []);

  console.log("TESTING THE TOKEN");

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
