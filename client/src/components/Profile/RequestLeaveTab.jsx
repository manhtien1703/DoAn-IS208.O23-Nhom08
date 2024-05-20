import { useState } from "react";
const fakeData = [
  {
    startDate: "2024-05-20",
    endDate: "2024-05-25",
    reason: "Nghỉ phép",
    status: "Đang chờ duyệt",
  },
  {
    startDate: "2024-06-01",
    endDate: "2024-06-05",
    reason: "Công tác",
    status: "Đang chờ duyệt",
  },
  {
    startDate: "2024-07-10",
    endDate: "2024-07-15",
    reason: "Nghỉ ốm",
    status: "Đang chờ duyệt",
  },
];

function RequestLeaveTab() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reason, setReason] = useState("");
  const [submissions, setSubmissions] = useState([...fakeData]);

  const MinimumDay = new Date(); // Lấy ngày mai
  MinimumDay.setDate(MinimumDay.getDate() + 7); // Tăng ngày hiện tại lên 1 để có ngày mai
  const MinimumDayFormatted = MinimumDay.toISOString().split("T")[0];

  const handleSubmit = (event) => {
    event.preventDefault();
    // Thêm dữ liệu vào bảng
    setSubmissions([
      ...submissions,
      {
        startDate: startDate,
        endDate: endDate,
        reason: reason,
        status: "Đang chờ duyệt",
      },
    ]);
    // Xóa dữ liệu đã nhập trong form
    setStartDate("");
    setEndDate("");
    setReason("");
  };

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
              onChange={(e) => setStartDate(e.target.value)}
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
              onChange={(e) => setEndDate(e.target.value)}
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
            {submissions.map((submission, index) => (
              <tr key={index}>
                <td className="border px-4 py-2">{submission.startDate}</td>
                <td className="border px-4 py-2">{submission.endDate}</td>
                <td className="border px-4 py-2 w-1/3">{submission.reason}</td>
                <td className="border px-4 py-2 text-orange-300">
                  {submission.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default RequestLeaveTab;
