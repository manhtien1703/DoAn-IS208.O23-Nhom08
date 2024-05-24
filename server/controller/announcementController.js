import {
  countAnnouncementsService,
  getAllAnnouncementsService,
  getAnnouncementService,
  getAnnouncementsByUserIDService,
  getGeneralAnnouncementsService,
  updateAnnouncementRecipient,
} from "../services/announcementService.js";

export const getAllAnnouncements = async (req, res) => {
  try {
    const announcements = await getAllAnnouncementsService();

    res.status(200).json({
      status: "success",
      message: "Lấy danh sách thông báo thành công",
      announcements: announcements,
    });
  } catch (error) {
    res.status(404).json({
      status: "error",
      message: error.message,
    });
  }
};

export const getGeneralAnnouncements = async (req, res) => {
  try {
    const { limit, offset } = req.query;
    const announcements = await getGeneralAnnouncementsService(limit, offset);

    res.status(200).json({
      status: "success",
      message: "Lấy danh sách thông báo thành công",
      announcements: announcements,
    });
  } catch (error) {
    res.status(404).json({
      status: "error",
      message: error.message,
    });
  }
};

export const getAnnouncement = async (req, res) => {
  try {
    const id = req.params.id;
    let announcement = await getAnnouncementService(id);

    res.status(200).json({
      status: "success",
      message: "Lấy thông báo thành công",
      announcement: announcement,
    });
  } catch (error) {
    res.status(404).json({
      status: "error",
      message: error.message,
    });
  }
};

/**
 * tìm thông báo của người dùng
 * @param {Object} req - Request object từ Express
 * @param {Object} res - Response object từ Express
 */
export const getUsersAnnouncements = async (req, res) => {
  try {
    const limit = req.query.limit;
    const id = req.query.id;
    const date = req.query.date;
    const status = req.query.status;
    const offset = req.query.offset;
    let result = await getAnnouncementsByUserIDService(
      id,
      date,
      status,
      limit,
      offset
    );
    res.status(200).json({
      status: "success",
      message: "Lấy danh sách thông báo thành công",
      announcements: result.announcements,
      unseenCount: result.unseenCount,
    });
  } catch (error) {
    res.status(404).json({
      status: "error",
      message: error.message,
    });
  }
};

/**
 * đếm số lượng thông báo của người dùng
 * @param {Object} req - Request object từ Express
 * @param {Object} res - Response object từ Express
 */
export const countUsersAnnouncements = async (req, res) => {
  try {
    const id = req.query.id;

    let result = await countAnnouncementsService(id);
    res.status(200).json({
      status: "success",
      message: "Lấy số lượng thông báo thành công!",
      count: result.allAnnouncementsCount,
    });
  } catch (error) {
    res.status(404).json({
      status: "error",
      message: error.message,
    });
  }
};

/**
 * cập nhật trạng thái của thông báo
 * @param {Object} req - Request object từ Express
 * @param {Object} res - Response object từ Express
 */
export const updateAnnouncementStatus = async (req, res) => {
  const { announcementid, userid } = req.params;
  const { status } = req.body;

  try {
    const updatedAnnouncement = await updateAnnouncementRecipient(
      parseInt(announcementid),
      parseInt(userid),
      status
    );

    if (updatedAnnouncement) {
      // Nếu thông báo đã được cập nhật thành công, trả về dữ liệu của thông báo đã được cập nhật
      return res.json(updatedAnnouncement);
    } else {
      // Nếu không tìm thấy thông báo với ID đã cho, trả về lỗi 404 Not Found
      return res.status(404).json({ error: "Announcement not found" });
    }
  } catch (error) {
    // Nếu có lỗi xảy ra trong quá trình cập nhật, trả về lỗi 500 Internal Server Error
    console.error("Error updating announcement:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
