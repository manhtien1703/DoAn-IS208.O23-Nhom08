import { useState } from "react";
import ScheduleTable from "./RoomScheduleTable";

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
  const [selectedRoom, setSelectedRoom] = useState(rooms[0]);
  const [selectedDate, setSelectedDate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const roomsPerPage = 8;
  const totalPages = Math.ceil(rooms.length / roomsPerPage);

  const handleRoomClick = (room) => {
    setSelectedRoom(room);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastRoom = currentPage * roomsPerPage;
  const indexOfFirstRoom = indexOfLastRoom - roomsPerPage;
  const currentRooms = rooms.slice(indexOfFirstRoom, indexOfLastRoom);

  return (
    <div className="container md:min-h-screen items-start mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Danh sách Phòng</h1>
      <div className="flex flex-col md:flex-row space-x-4 gap-4">
        <div className="w-full md:w-1/3">
          <ul className="grid grid-cols-4 md:grid-cols-2 xl:grid-cols-4 gap-4">
            {currentRooms.map((room) => (
              <li key={room.id}>
                <button
                  onClick={() => handleRoomClick(room)}
                  className={`w-full min-h-full p-2 md:p-4  rounded ${
                    room.id === selectedRoom.id
                      ? "bg-blue-700 text-white"
                      : "bg-blue-500 text-white hover:bg-blue-700"
                  }`}
                >
                  {room.name}
                </button>
              </li>
            ))}
          </ul>
          <div className="flex justify-center mt-4">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => handlePageChange(index + 1)}
                className={`px-3 py-1 mx-1 rounded ${
                  currentPage === index + 1
                    ? "bg-slate-600 text-white"
                    : "bg-slate-100 text-slate-600 hover:opacity-30"
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
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
            <ScheduleTable room={selectedRoom.name} date={selectedDate} />
          ) : (
            <p className="p-4">Chọn một phòng và ngày để xem lịch trình</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default RoomList;
