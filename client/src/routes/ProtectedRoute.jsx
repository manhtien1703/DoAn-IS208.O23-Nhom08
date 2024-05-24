import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/slices/authSlice";
import { Navigate } from "react-router";

const ProtectedRoute = ({ children }) => {
  const user = useSelector(selectUser);
  return user ? children : <Navigate to="/login" />;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
