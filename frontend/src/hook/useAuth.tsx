import { jwtDecode } from "jwt-decode";
import { selectCurrentToken } from "../Pages/Login/authSlice";
import { useSelector } from "react-redux";
const useAuth = () => {
  const token = useSelector(selectCurrentToken);

  if (token) {
    const decoded = jwtDecode(token);
    return decoded.userDetail;
  }

  return null;
};

export default useAuth;
