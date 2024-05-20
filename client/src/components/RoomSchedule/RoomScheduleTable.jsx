import PropTypes from "prop-types";
import { useState } from "react";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";

const RoomScheduleTable = ({ room, date }) => {
  // Giả sử chúng ta có dữ liệu lịch trình của tòa nhà
  const [scheduleData, setScheduleData] = useState({
    "Phòng 101": {
      "2024-05-18": [
        { time: "08:00 - 09:00", reason: "Cuộc họp công ty" },
        { time: "10:00 - 11:00", reason: "Đào tạo nhân viên" },
      ],
      "2024-05-19": [
        { time: "09:00 - 10:00", reason: "Họp phòng kỹ thuật" },
        { time: "13:00 - 14:00", reason: "Thảo luận dự án" },
      ],
    },
    "Phòng 102": {
      "2024-05-18": [
        { time: "09:00 - 10:00", reason: "Họp marketing" },
        { time: "11:00 - 12:00", reason: "Họp ban giám đốc" },
      ],
      "2024-05-19": [
        { time: "10:00 - 11:00", reason: "Đào tạo kỹ thuật" },
        { time: "14:00 - 15:00", reason: "Họp khách hàng" },
      ],
    },
    // Thêm dữ liệu cho các phòng khác nếu cần
  });

  const schedule = scheduleData[room]?.[date] || [];

  return (
    <div className="p-4 bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-2">{`Lịch trình của ${room} vào ngày ${date}`}</h2>
      {schedule.length > 0 ? (
        <table className="w-full table-auto border-collapse mb-4">
          <thead>
            <tr>
              <th className="border px-4 py-2">Thời gian</th>
              <th className="border px-4 py-2">Lý do sử dụng</th>
            </tr>
          </thead>
          <tbody>
            {schedule.map((entry, index) => (
              <tr key={index}>
                <td className="border px-4 py-2">{entry.time}</td>
                <td className="border px-4 py-2">{entry.reason}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="mb-4">Không có lịch trình nào cho ngày này.</p>
      )}
    </div>
  );
};

RoomScheduleTable.propTypes = {
  room: PropTypes.func.isRequired,
  date: PropTypes.func.isRequired,
};

export default RoomScheduleTable;
