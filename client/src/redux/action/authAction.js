import { getInfo, logout } from "../slices/authSlice";

export const getUserInfo = (user) => async (dispatch) => {
  dispatch(getInfo(user));
};

export const logoutUser = () => async (dispatch) => {
  // Add async logout logic if needed
  dispatch(logout());
};
