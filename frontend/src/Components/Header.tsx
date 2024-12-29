import useAuth from "../hook/useAuth";
import { User } from "../types";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logOut } from "../Pages/Login/authSlice";

const Header = () => {
  const authDetails: User = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handle_logout = () => {
    dispatch(logOut());
    navigate("/");
  };
  return (
    <div className="border-2 h-[60px] w-full flex justify-center items-center shadow-xl">
      <div className="w-10/12 mx-auto flex justify-between items-center">
        <p className="text-[16px]">
          Welcome{" "}
          <span className="text-[18px] font-bold">{authDetails.name}</span>
        </p>

        <button onClick={handle_logout}>Logout</button>
      </div>
    </div>
  );
};

export default Header;
