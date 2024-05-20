import Header from "../../layouts/DefaultLayout/Header";
import Footer from "../../layouts/DefaultLayout/Footer";
import { useState } from "react";

const notifications = [
  { id: 1, content: "Thông báo 1", seen: "đã xem" },
  { id: 2, content: "Thông báo 2", seen: "Chưa xem" },
  { id: 3, content: "Thông báo 3", seen: "Chua xem" },
];

export default function Notification() {
  const [searchName, setSearchName] = useState("");
  const [searchDate, setSearchDate] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Hàm xử lý sự kiện thay đổi ngày tìm kiếm
  const handleDateChange = (event) => {
    setSearchDate(event.target.value);
  };

  // Hàm xử lý sự kiện thay đổi trạng thái bộ lọc
  const handleStatusChange = (event) => {
    setStatusFilter(event.target.value);
  };

  const filterNotifications = () => {};

  const filteredNotifications = notifications.filter(filterNotifications);

  return (
    <>
      <Header />
      <div className="min-h-screen bg-zinc-100 dark:bg-zinc-800">
        <div className="grid grid-cols-4 gap-4 p-4">
          <div className="col-span-4 md:col-span-1 bg-white dark:bg-zinc-700 shadow rounded-lg p-4">
            <div className="mb-4">
              <h2 className="font-bold text-xl mb-2">Bộ lọc</h2>
              <div className="items-center p-2 rounded overflow-hidden">
                <label htmlFor="search-day" className="mb-3 font-bold">
                  Ngày
                </label>
                <input
                  type="date"
                  id="search-day"
                  className="py-2 px-1 w-full mt-2 border-2 bg-transparent"
                  placeholder="Search this site..."
                />
              </div>
              <div className="items-center p-2 rounded overflow-hidden">
                <label htmlFor="selectOption" className="my-3 mr-3 font-bold">
                  Trạng thái
                </label>
                <select id="selectOption" className="p-2 mt-3 border-2 w-full">
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
                <li className="mb-1">
                  <a href="#" className="text-blue-500 hover:text-blue-600">
                    Thông báo Danh sách sinh viên dự kiến TN đợt 2 năm 2024 -
                    14/05/2024 - 14:26
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
