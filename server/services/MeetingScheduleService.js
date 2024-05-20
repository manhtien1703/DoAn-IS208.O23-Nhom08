import { Op } from "sequelize";
import MeetingSchedule from "./models/MeetingSchedule";

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
 * @throws {Error} - Ném lỗi nếu phòng đã được sử dụng
 */
const bookMeetingRoom = async (meetingData) => {
  const { RoomID, StartTime, EndTime } = meetingData;

  const roomAvailable = await isRoomAvailable(RoomID, StartTime, EndTime);
  if (!roomAvailable) {
    throw new Error("Phòng họp đã được sử dụng trong khoảng thời gian này.");
  }

  // Tạo cuộc họp mới nếu phòng có sẵn
  const newMeeting = await MeetingSchedule.create(meetingData);
  return newMeeting;
};

/**
 * Lấy lịch trình của phòng họp bằng RoomID
 * @param {number} roomId - ID của phòng họp
 * @returns {Promise<Array>} - Trả về danh sách các cuộc họp trong phòng
 */
const getRoomSchedule = async (roomId) => {
  try {
    const schedule = await MeetingSchedule.findAll({
      where: {
        RoomID: roomId,
      },
      order: [["StartTime", "ASC"]],
    });
    return schedule;
  } catch (error) {
    console.error("Không thể lấy lịch trình của phòng họp:", error);
    throw error;
  }
};

export { isRoomAvailable, bookMeetingRoom, getRoomSchedule };
