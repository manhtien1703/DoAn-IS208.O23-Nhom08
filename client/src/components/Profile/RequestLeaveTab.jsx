import { useEffect, useState } from "react";
import Notify from "../../components/Toast/Notify";
import axios from "axios";
import { serverURL } from "../../utils/server";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/slices/authSlice";
import { convertDateToString } from "../../utils/index";

function RequestLeaveTab() {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reason, setReason] = useState("");
  const [error, setError] = useState(false);

  const user = useSelector(selectUser);

  const MinimumDay = new Date(); // Lấy ngày mai
  MinimumDay.setDate(MinimumDay.getDate() + 7); // Tăng ngày hiện tại lên 1 để có ngày mai
  const MinimumDayFormatted = MinimumDay.toISOString().split("T")[0];

  const handleStartDateChange = (e) => {
    const newStartDate = e.target.value;
    setStartDate(newStartDate);
    if (endDate && newStartDate > endDate) {
      setError(true);
    } else {
      setError(false);
    }
  };

  const handleEndDateChange = (e) => {
    const newEndDate = e.target.value;
    setEndDate(newEndDate);
    if (startDate && startDate > newEndDate) {
      setError(true);
    } else {
      setError(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Thêm dữ liệu vào bảng
    if (error) {
      Notify("error", "Ngày kết thúc phải nhỏ hơn hoặc bằng ngày bắt đầu nghỉ");
      return;
    }
    try {
      const res = await axios.post(`${serverURL}/leave-request/add`, {
        EmployeeID: user.EmployeeID,
        StartDate: startDate,
        EndDate: endDate,
        Reason: reason,
      });
      if (res.data.status === "success") {
        Notify("success", "Đã gửi yêu cầu xin nghỉ thành công");
        getLeaveRequests();

        // Xóa dữ liệu đã nhập trong form
        setStartDate("");
        setEndDate("");
        setReason("");
      } else {
        Notify("error", res.data.message);
      }
    } catch (e) {
      Notify("error", "Lấy thông tin yêu cầu nghỉ phép thất bại");
      console.log(e.message);
    }
  };

  const getLeaveRequests = async () => {
    try {
      const res = await axios.get(
        `${serverURL}/leave-request?EmployeeID=${user.EmployeeID}`
      );
      if (res.data.status === "success") {
        setLeaveRequests([...res.data.leaveRequest]);
      } else {
        Notify("error", res.data.message);
      }
    } catch (e) {
      Notify("error", "Lấy thông tin yêu cầu nghỉ phép thất bại");
      console.log(e.message);
    }
  };

  useEffect(() => {
    getLeaveRequests();
  }, []);

  return (
    <div className="w-full h-full grid grid-cols-5 gap-5 ">
      <div className="h-min col-span-5 lg:col-span-2 bg-white dark:bg-zinc-800 rounded-lg shadow-lg p-6 ">
        <form className="space-y-4 " onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="start-date"
              className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
            >
              Ngày bắt đầu
            </label>
            <input
              type="date"
              id="start-date"
              value={startDate}
              min={MinimumDayFormatted}
              onChange={handleStartDateChange}
              className="mt-1 block w-full p-2 border border-zinc-300 dark:border-zinc-600 rounded-md bg-zinc-50 dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100"
              required
            />
          </div>
          <div>
            <label
              htmlFor="end-date"
              className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
            >
              Ngày kết thúc
            </label>
            <input
              type="date"
              id="end-date"
              value={endDate}
              min={MinimumDayFormatted}
              onChange={handleEndDateChange}
              className="mt-1 block w-full p-2 border border-zinc-300 dark:border-zinc-600 rounded-md bg-zinc-50 dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100"
              required
            />
          </div>
          <div>
            <label
              htmlFor="reason"
              className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
            >
              Lý do
            </label>
            <textarea
              id="reason"
              rows="4"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="mt-1 block w-full p-2 border border-zinc-300 dark:border-zinc-600 rounded-md bg-zinc-50 dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
          >
            Nộp yêu cầu xin nghỉ phép
          </button>
        </form>
      </div>
      <div className="col-span-5 lg:col-span-3">
        <table className="w-full table-auto border-collapse mb-4">
          <thead>
            <tr>
              <th className="border px-4 py-2">Ngày bắt đầu</th>
              <th className="border px-4 py-2">Ngày kết thúc</th>
              <th className="border px-4 py-2 w-1/3">Lý do</th>
              <th className="border px-4 py-2">Trạng thái</th>
            </tr>
          </thead>
          <tbody>
            {leaveRequests.map((leaveRequest, index) => (
              <tr key={index}>
                <td className="border px-4 py-2">
                  {convertDateToString(new Date(leaveRequest.StartDate))}
                </td>
                <td className="border px-4 py-2">
                  {convertDateToString(new Date(leaveRequest.EndDate))}
                </td>
                <td className="border px-4 py-2 w-1/3">
                  {leaveRequest.Reason}
                </td>
                {leaveRequest.Status === "Pending" ? (
                  <td className="border px-4 py-2 w-1/3 text-yellow-500">
                    Đang chờ duyệt
                  </td>
                ) : leaveRequest.Status === "Approved" ? (
                  <td className="border px-4 py-2 w-1/3 text-green-600">
                    Đã duyệt
                  </td>
                ) : (
                  <td className="border px-4 py-2 w-1/3 text-red-500">
                    Từ chối
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default RequestLeaveTab;
