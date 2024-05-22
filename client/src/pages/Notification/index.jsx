import { useEffect, useState } from "react";
import DefaultLayout from "../../layouts/DefaultLayout";
import { useSelector } from "react-redux";
import axios from "axios";
import { selectUser } from "../../redux/slices/authSlice";
import { serverURL } from "../../utils/server";
import { Link } from "react-router-dom";
import { convertDateToString, slugify } from "../../utils";

export default function Notification() {
  const user = useSelector(selectUser);
  const [searchDate, setSearchDate] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [notifications, setNotifications] = useState([]);
  const [filteredNotifications, setFilteredNotifications] = useState([]);

  // Hàm xử lý sự kiện thay đổi ngày tìm kiếm
  const handleDateChange = (event) => {
    setSearchDate(event.target.value);
  };

  // Hàm xử lý sự kiện thay đổi trạng thái bộ lọc
  const handleStatusChange = (event) => {
    setStatusFilter(event.target.value);
  };

  const handleSearch = () => {
    const filteredByDate = notifications.filter((notification) => {
      if (!searchDate) {
        return true;
      }
      return (
        convertDateToString(new Date(notification.CreatedAt)) ===
        convertDateToString(new Date(searchDate))
      );
    });

    const filteredByStatus = filteredByDate.filter((notification) => {
      if (statusFilter === "all") {
        return true;
      }
      return slugify(notification.Status) === slugify(statusFilter);
    });
    setFilteredNotifications([...filteredByStatus]);
  };

  useEffect(() => {
    const getNotifications = async () => {
      try {
        const result = await axios.get(
          `${serverURL}/users/announcement?id=${user.EmployeeID}`
        );
        setNotifications([...result.data.announcements]);
        setFilteredNotifications([...result.data.announcements]);
      } catch (e) {
        console.log(e);
      }
    };
    getNotifications();
  }, []);

  useEffect(() => {
    handleSearch();
  }, [searchDate, statusFilter]);

  return (
    <DefaultLayout>
      <div className="min-h-screen bg-zinc-100 dark:bg-zinc-800">
        <div className="flex flex-col md:grid-cols-5  lg:grid lg:grid-cols-4 gap-4 p-4">
          <div className="col-span-4 md:col-span-2 lg:md:col-span-1 bg-white dark:bg-zinc-700 shadow rounded-lg p-4">
            <div className="mb-4">
              <h2 className="font-bold text-xl mb-2">Bộ lọc</h2>
              <div className="items-center p-2 rounded overflow-hidden">
                <label htmlFor="search-day" className="mb-3 font-bold">
                  Ngày
                </label>
                <input
                  type="date"
                  id="search-day"
                  // value={searchDate}
                  onChange={handleDateChange}
                  className="py-2 px-1 w-full mt-2 border-2 bg-transparent"
                />
              </div>
              <div className="items-center p-2 rounded overflow-hidden">
                <label htmlFor="selectOption" className="my-3 mr-3 font-bold">
                  Trạng thái
                </label>
                <select
                  id="selectOption"
                  value={statusFilter}
                  onChange={handleStatusChange}
                  className="p-2 mt-3 border-2 w-full"
                >
                  <option value="all">tất cả</option>
                  <option value="seen">đã xem</option>
                  <option value="not seen">chưa xem</option>
                </select>
              </div>
            </div>
          </div>

          <div className="col-span-4 md:col-span-3">
            <div className="rounded-lg py-4 px-10 mb-4">
              <h2 className="font-bold text-2xl mb-5">THÔNG BÁO</h2>
              <ul>
                {filteredNotifications.map((notification, index) => (
                  <li key={index} className="mb-5">
                    <div className="flex justify-between">
                      <Link>{notification.Announcement.Title}</Link>
                      <span>
                        {convertDateToString(new Date(notification.CreatedAt))}
                      </span>
                    </div>
                    <div></div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
}
