import { Op } from "sequelize";
import MeetingSchedule from "../models/MeetingSchedule.js";
import MeetingRoom from "../models/MeetingRoom.js";

/**
 * Kiểm tra xem phòng họp có sẵn không
 * @param {number} roomId - ID của phòng họp
 * @param {Date} startTime - Thời gian bắt đầu của cuộc họp mới
 * @param {Date} endTime - Thời gian kết thúc của cuộc họp mới
 * @returns {Promise<boolean>} - Trả về true nếu phòng có sẵn, false nếu không
 */
const isRoomAvailable = async (roomId, startTime, endTime) => {
  const overlappingMeetings = await MeetingSchedule.findOne({
    where: {
      RoomID: roomId,
      [Op.or]: [
        {
          StartTime: {
            [Op.between]: [startTime, endTime],
          },
        },
        {
          EndTime: {
            [Op.between]: [startTime, endTime],
          },
        },
        {
          [Op.and]: [
            {
              StartTime: {
                [Op.lte]: startTime,
              },
            },
            {
              EndTime: {
                [Op.gte]: endTime,
              },
            },
          ],
        },
      ],
    },
  });

  return overlappingMeetings === null; // Trả về true nếu không có cuộc họp nào trùng lặp
};

/**
 * Đăng ký cuộc họp mới
 * @param {Object} meetingData - Dữ liệu của cuộc họp mới
 * @returns {Promise<Object>} - Trả về cuộc họp mới nếu đăng ký thành công
 * @return {Error} - Ném lỗi nếu phòng đã được sử dụng
 */
const bookMeetingRoom = async (meetingData) => {
  const { RoomID, StartTime, EndTime } = meetingData;

  const roomAvailable = await isRoomAvailable(RoomID, StartTime, EndTime);
  if (!roomAvailable) {
    return {
      success: false,
    };
  }
  // Tạo cuộc họp mới nếu phòng có sẵn
  const newMeeting = await MeetingSchedule.create(meetingData);
  return {
    success: false,
    newMeeting,
  };
};

/**
 * Lấy lịch trình của phòng họp bằng RoomID
 * @returns {Promise<Array<object>>} - Trả về danh sách các phòng
 * @throws {Error} - Ném lỗi nếu không thể lấy được danh sách phòng
 */
const getRoomsService = async () => {
  try {
    const rooms = await MeetingRoom.findAll();
    return rooms;
  } catch (error) {
    console.error("Không thể lấy được danh sách phòng họp:", error);
    throw error;
  }
};

/**
 * Lấy lịch trình của phòng họp theo ngày
 * @param {string} roomId - ID của phòng họp
 * @param {Date} date - Ngày cần lấy lịch trình
 * @returns {Promise<Array<Object>>} - Mảng các cuộc họp trong phòng họp vào ngày cụ thể
 * @throws {Error} - Ném lỗi nếu không thể lấy lịch trình của phòng họp
 */
const getRoomScheduleByDate = async (roomId, date) => {
  try {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0); // Đặt thời gian về 00:00:00
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999); // Đặt thời gian về 23:59:59.999

    const schedule = await MeetingSchedule.findAll({
      where: {
        RoomID: roomId,
        // Cuộc họp bắt đầu trước hoặc vào ngày cần lấy lịch trình
        StartTime: {
          [Op.lte]: endOfDay,
        },
        // Cuộc họp kết thúc sau hoặc vào ngày cần lấy lịch trình
        EndTime: {
          [Op.gte]: startOfDay,
        },
      },
      order: [["StartTime", "ASC"]],
    });
    return schedule;
  } catch (error) {
    console.error("Không thể lấy lịch trình của phòng họp:", error);
    throw error;
  }
};

export {
  isRoomAvailable,
  bookMeetingRoom,
  getRoomScheduleByDate,
  getRoomsService,
};
