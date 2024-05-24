import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/slices/authSlice";
import { Navigate } from "react-router";

const ManagerRoute = ({ children }) => {
  const user = useSelector(selectUser);
  if (!user) {
    return <Navigate to="/login" />;
  }

  if (user.Role !== "Phong nhan su") {
    return <Navigate to="/access-deny" />;
  }

  return children;
};

ManagerRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ManagerRoute;
