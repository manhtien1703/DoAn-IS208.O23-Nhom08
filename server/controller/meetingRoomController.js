import {
  getRoomScheduleByDate,
  getRoomsService,
} from "../services/meetingScheduleService.js";

export const getAllRooms = async (req, res) => {
  try {
    const rooms = await getRoomsService();
    res.status(200).json({
      status: "success",
      message: "Lấy danh sách phòng họp thành công",
      meetingrooms: rooms,
    });
  } catch (error) {
    console.log(error.message);
    res.status(404).json({
      status: "error",
      message: error.message,
    });
  }
};

export const getRoomSchedule = async (req, res) => {
  try {
    const { id, date } = req.params;
    const rooms = await getRoomScheduleByDate(parseInt(id), new Date(date));
    res.status(200).json({
      status: "success",
      message: "Lấy lịch họp thành công",
      meetingrooms: rooms,
    });
  } catch (error) {
    console.log(error.message);
    res.status(404).json({
      status: "error",
      message: error.message,
    });
  }
};
