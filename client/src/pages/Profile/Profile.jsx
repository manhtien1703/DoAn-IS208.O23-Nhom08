import { useState } from "react";
import Header from "../../layouts/DefaultLayout/Header";
import Footer from "../../layouts/DefaultLayout/Footer";

import { IoIosLogOut } from "react-icons/io";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/slices/authSlice";
import ProfileTab from "../../components/Profile/ProfileTab";
import RequestLeaveTab from "../../components/Profile/RequestLeaveTab";

export default function Profile() {
  const [activeTab, setActiveTab] = useState(0);
  const dispatch = useDispatch();

  const tabs = ["Hồ sơ cá nhân", "Yêu cầu nghỉ phép"];

  const renderContent = () => {
    switch (activeTab) {
      case 0:
        return <ProfileTab />;
      case 1:
        return <RequestLeaveTab />;
      default:
        return null;
    }
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <>
      <Header />
      <div className="flex flex-col min-h-screen md:flex-row p-4 bg-white dark:bg-zinc-800">
        <div className="w-full max-h-56 lg:w-1/4 md:w-1/3 bg-zinc-100 dark:bg-zinc-700 p-4 rounded-lg shadow-md">
          <div className="mb-4">
            <h2 className="font-semibold text-lg dark:text-white">
              Bảng điều khiển
            </h2>
          </div>
          <ul className="space-y-2">
            {tabs.map((tab, index) => (
              <li
                key={index}
                className={`cursor-pointer p-2 pl-5 rounded ${
                  activeTab === index
                    ? "bg-blue-500 text-white"
                    : "bg-zinc-100 dark:bg-zinc-700 text-black dark:text-white border-2 border-transparent hover:border-blue-700"
                }`}
                onClick={() => setActiveTab(index)}
              >
                {tab}
              </li>
            ))}
            <li>
              <button
                onClick={handleLogout}
                className=" w-full flex cursor-pointer p-2 pl-5 rounded gap-3 items-center"
              >
                <IoIosLogOut />
                Đăng xuất
              </button>
            </li>
          </ul>
        </div>
        <div className="flex-1 mt-7 md:mt-0 p-4 ml-4 bg-zinc-50 dark:bg-zinc-900 rounded-lg">
          {renderContent()}
        </div>
      </div>
      <Footer />
    </>
  );
}
