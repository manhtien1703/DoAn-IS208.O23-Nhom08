import { IoMdMenu } from "react-icons/io";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/slices/authSlice";
import { FaBell } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const navList = [
  {
    name: "Trang chủ",
    url: "/",
  },
  {
    name: "Bảng tin",
    url: "/news",
  },
  {
    name: "Lịch phòng",
    url: "/room-schedule",
  },
];

const sampleNotifications = Array.from({ length: 5 }, (_, i) => ({
  id: i + 1,
  message: `Thông báo ${i + 1}`,
}));

const Header = () => {
  const user = useSelector(selectUser);
  const [newNotificationCount, setNewNotificationCount] = useState(1);
  const [isNotifyPopupOpen, setIsNotifyPopupOpen] = useState(false);
  const popupRef = useRef(null);

  const onMenuToggle = () => {
    const navLinks = document.querySelector(".navLinks");
    navLinks.classList.toggle("left-[0%]");
    navLinks.classList.toggle("-translate-x-5");
  };

  const notifyToggle = () => {
    setIsNotifyPopupOpen(!isNotifyPopupOpen);
  };

  const handleClickOutside = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      setIsNotifyPopupOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <header className=" top-0 w-full drop-shadow-lg  px-3 py-1 bg-orange-50">
      <nav className="relative flex justify-between">
        <div className=" w-[50px] md:w-[100px] flex items-center">
          <img src="/images/logo.png" alt="LOGO" />
        </div>
        <div className="flex items-center gap-3 ">
          <div className="navLinks rounded-md  bg-white  duration-500 absolute md:bg-transparent md:static md:w-auto w-full h-auto  flex md:items-center gap-[1.5vw] top-[120%] left-[-100%] -translate-x-5 px-5 md:py-0 py-5">
            <ul className="flex  md:flex-row flex-col md:items-center md:gap-[2vw] gap-8">
              {navList.map((navListItem) => (
                <li
                  key={navListItem.url}
                  className="relative max-w-fit pr-3 md:pr-0 py-1 after:bg-gradient-to-r from-[#2b68e0] to-[#e710ea] after:absolute after:h-1 after:w-0 after:bottom-0 after:left-0 hover:after:w-full after:transition-all after:duration-300"
                >
                  <a href={navListItem.url}>{navListItem.name}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="flex items-center gap-2 md:gap-7 justify-between md:p-7">
          <div className="relative">
            <div onClick={notifyToggle} className="cursor-pointer">
              <FaBell style={{ fontSize: "30px" }} />
              {newNotificationCount > 0 && (
                <span className="absolute -top-1 -right-1 inline-flex items-center justify-center w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full">
                  {newNotificationCount}
                </span>
              )}
            </div>
            {isNotifyPopupOpen && (
              <div
                ref={popupRef}
                className="absolute w-80 md:w-96 right-20 translate-x-1/2 top-14 mt-2 bg-white border border-gray-300 rounded shadow-lg"
              >
                <div className="p-4">
                  <h4 className="text-xl font-bold mb-2 text-center">
                    Thông báo
                  </h4>
                  {sampleNotifications.length > 0 ? (
                    <ul>
                      {sampleNotifications.map((notification) => (
                        <li
                          key={notification.id}
                          className="py-5 border-b border-gray-200"
                        >
                          {notification.message}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>Không có thông báo mới</p>
                  )}
                  <Link to="/notifications" className="w-full mt-7">
                    <p className="mt-7 text-xl font-bold mb-2 text-center">
                      {" "}
                      Xem tất cả
                    </p>
                  </Link>
                </div>
              </div>
            )}
          </div>

          <div className="relative w-auto flex items-center gap-4">
            <Link
              to="/profile"
              className=" text-xl  font-semibold flex items-center gap-4 text-gray-800"
            >
              <span className=" text-xl  font-semibold">{user?.name}</span>
              <img
                src="https://as2.ftcdn.net/v2/jpg/03/49/49/79/1000_F_349497933_Ly4im8BDmHLaLzgyKg2f2yZOvJjBtlw5.jpg"
                alt={`Người dùng ${user?.name}`}
                className="h-11 rounded-full"
              />
            </Link>
          </div>

          <button
            onClick={() => onMenuToggle(this)}
            className=" cursor-pointer md:hidden"
          >
            <IoMdMenu />
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
