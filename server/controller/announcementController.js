import {
  getAllAnnouncementsService,
  getAnnouncementService,
} from "../services/announcementService.js";

export const getAllAnnouncements = async (req, res) => {
  try {
    let announcements = await getAllAnnouncementsService();

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
