import { useState } from "react";
import Notify from "../Toast/Notify";
import { getInfo, selectUser } from "../../redux/slices/authSlice";
import PropTypes from "prop-types";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import axios from "axios";
import { serverURL } from "../../utils/server";

const LoginForm = ({ dispatch }) => {
  const navigate = useNavigate();
  console.log(useSelector(selectUser));

  // Tạo state để lưu trữ email và password
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Xử lý thay đổi trong input và cập nhật state
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Xử lý khi người dùng nhấn nút đăng nhập
  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await axios.post(`${serverURL}/users/login`, {
      email: formData.email,
      password: formData.password,
    });

    if (result.data.status === "success") {
      Notify("success", "Đăng nhập thành công");
      navigate("/");
      dispatch(getInfo(result.data.user));
    } else {
      console.log(result.message);
      Notify("error", result.data.message);
    }
  };

  return (
    <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
      <div>
        <label
          htmlFor="email"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Email của bạn
        </label>
        <input
          type="email"
          name="email"
          id="email"
          value={formData.email}
          onChange={handleChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="name@company.com"
          required
        />
      </div>
      <div>
        <label
          htmlFor="password"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Mật khẩu
        </label>
        <input
          type="password"
          name="password"
          id="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="••••••••"
          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
        />
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input
              id="remember"
              aria-describedby="remember"
              type="checkbox"
              className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
            />
          </div>
          <div className="ml-3 text-sm">
            <label
              htmlFor="remember"
              className="text-gray-500 dark:text-gray-300"
            >
              Remember me
            </label>
          </div>
        </div>
        <a
          href="#"
          className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
        >
          Quên mật khẩu?
        </a>
      </div>
      <button
        type="submit"
        className="w-full bg-cyan-600 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
      >
        Sign in
      </button>
    </form>
  );
};

LoginForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default LoginForm;
