import { login, logout } from "../slices/authSlice";

export const getUserInfo = (user) => async (dispatch) => {
  // add async login logic
  const user = { user: user };

  dispatch(login(user));
};

export const logoutUser = () => async (dispatch) => {
  // Add async logout logic if needed
  dispatch(logout());
};
