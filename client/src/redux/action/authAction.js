
import { login, logout } from '../slices/authSlice';

export const getUserInfo = (email) => async (dispatch) => {
  // add async login logic 
  const user = {email: email}

  dispatch(login(user));
};

export const logoutUser = () => async (dispatch) => {
  // Add async logout logic if needed
  dispatch(logout());
};
