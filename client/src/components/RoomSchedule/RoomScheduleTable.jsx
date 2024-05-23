import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import { convertDateToString } from "../../utils";
import { serverURL } from "../../utils/server";
import axios from "axios";
import Notify from "../Toast/Notify";

const RoomScheduleTable = ({ room, date }) => {
  // Giả sử chúng ta có dữ liệu lịch trình của tòa nhà
  const [scheduleData, setScheduleData] = useState([]);

  const schedule = scheduleData[room]?.[date] || [];

  useEffect(() => {
    const loadScheduleData = async () => {
      try {
        const result = await axios.get(
          `${serverURL}/meeting-room/${room.RoomID}/${date}`
        );
        if (result.data.status === "success") {
          console.log(result.data.meetingrooms);
          setScheduleData([...result.data.meetingrooms]);
        }
      } catch (e) {
        Notify("error", "Có lỗi khi lấy lịch trình của phòng");
        console.error(e.message);
      }
    };
    loadScheduleData();
  }, [room]);

  return (
    <div className="p-4 bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-2">{`Lịch trình của ${
        room.RoomName
      } vào ngày ${convertDateToString(new Date(date))}`}</h2>
      {scheduleData.length > 0 ? (
        <table className="w-full table-auto border-collapse mb-4">
          <thead>
            <tr>
              <th className="border px-4 py-2">Thời gian</th>
              <th className="border px-4 py-2 w-2/4">Lý do sử dụng</th>
            </tr>
          </thead>
          <tbody>
            {scheduleData.map((entry, index) => {
              const startTime = new Date(entry.StartTime);
              const startTimeString =
                startTime.getHours().toString().padStart(2, "0") +
                ":" +
                startTime.getMinutes().toString().padStart(2, "0") +
                " - " +
                convertDateToString(startTime);

              const endTime = new Date(entry.EndTime);
              const endTimeString =
                endTime.getHours().toString().padStart(2, "0") +
                ":" +
                endTime.getMinutes().toString().padStart(2, "0") +
                " - " +
                convertDateToString(endTime);

              return (
                <tr key={index}>
                  <td className="border px-4 py-2">
                    Từ {startTimeString} đến {endTimeString}
                  </td>
                  <td className="border px-4 py-2 w-2/4">
                    {entry.Description}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <p className="mb-4">Không có lịch trình nào cho ngày này.</p>
      )}
    </div>
  );
};

RoomScheduleTable.propTypes = {
  room: PropTypes.object.isRequired,
  date: PropTypes.string.isRequired,
};

export default RoomScheduleTable;
