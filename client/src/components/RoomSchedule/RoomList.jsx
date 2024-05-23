import { useEffect, useState } from "react";
import ScheduleTable from "./RoomScheduleTable";
import axios from "axios";
import { serverURL } from "../../utils/server";
import Notify from "../../components/Toast/Notify";

const rooms = [
  { id: 1, name: "Phòng 101" },
  { id: 2, name: "Phòng 102" },
  { id: 3, name: "Phòng 103" },
  { id: 4, name: "Phòng 104" },
  { id: 5, name: "Phòng 105" },
  { id: 6, name: "Phòng 106" },
  { id: 7, name: "Phòng 107" },
  { id: 8, name: "Phòng 108" },
  { id: 9, name: "Phòng 109" },
  { id: 10, name: "Phòng 110" },
  // ... thêm nhiều phòng hơn nếu cần
];

const RoomList = () => {
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState({});
  const [selectedDate, setSelectedDate] = useState("");
  const [currentPage, setCurrentPage] = useState(-1);
  const [totalPages, setTotalPages] = useState(0);

  const handleRoomClick = (room) => {
    setSelectedRoom(() => room);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    const loadRooms = async () => {
      const result = await axios.get(`${serverURL}/meeting-room`);
      if (result?.data?.status === "success") {
        setRooms([...result.data.meetingrooms]);
        setCurrentPage(1);
        setSelectedRoom(() => ({ ...result.data.meetingrooms[0] }));
      } else {
        Notify("error", "Có lỗi khi lấy danh sách phòng");
        console.error(result.data.message);
      }
    };

    loadRooms();
  }, []);

  return (
    <div className="container md:min-h-screen items-start mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Danh sách Phòng</h1>
      <div className="flex flex-col md:flex-row space-x-4 gap-4">
        <div className="w-full md:w-1/3">
          <ul className="grid grid-cols-4 md:grid-cols-2 xl:grid-cols-4 gap-4">
            {rooms.map((room, index) => (
              <li key={index}>
                <button
                  onClick={() => handleRoomClick(room)}
                  className={`w-full min-h-full p-2 md:p-4  rounded ${
                    room.RoomID === selectedRoom.RoomID
                      ? "bg-blue-700 text-white"
                      : "bg-blue-500 text-white hover:bg-blue-700"
                  }`}
                >
                  {room.RoomName}
                </button>
              </li>
            ))}
          </ul>
          {selectedRoom && (
            <input
              type="date"
              className="mt-4 w-full p-2 border rounded"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
          )}
        </div>
        <div className="w-full md:w-2/3">
          {selectedRoom && selectedDate ? (
            <ScheduleTable room={selectedRoom} date={selectedDate} />
          ) : (
            <p className="p-4">Chọn một phòng và ngày để xem lịch trình</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default RoomList;
