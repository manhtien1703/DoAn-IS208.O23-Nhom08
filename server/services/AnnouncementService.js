import { Op } from "sequelize";
import Announcement from "../models/Announcement.js";
import AnnouncementRecipient from "../models/AnnouncementRecipient.js";

/**
 * Tạo một thông báo mới và gửi đến một danh sách người dùng.
 * @param {string} title - Tiêu đề của thông báo mới.
 * @param {string} content - Nội dung của thông báo mới.
 * @param {Object[]} recipientIDs - Mảng chứa ID của người nhận thông báo.
 * @returns {Promise<object>} - Promise trả về thông báo được tạo.
 */
async function createAnnouncementService(title, content, employees) {
  try {
    // Tạo thông báo mới
    const announcement = await Announcement.create({
      Title: title,
      Content: content,
    });

    // Lặp qua mỗi ID người nhận và tạo một bản ghi AnnouncementRecipient cho mỗi người nhận
    for (const employee of employees) {
      await AnnouncementRecipient.create({
        AnnouncementID: announcement.AnnouncementID,
        RecipientID: employee.EmployeeID,
      });
    }

    console.log(
      "New announcement created and sent to users:",
      announcement.toJSON()
    );
    return announcement.toJSON();
  } catch (error) {
    console.error("Error creating and sending announcement to users:", error);
    throw error;
  }
}

/**
 * Đọc một thông báo dựa trên ID.
 * @param {number} id - ID của thông báo cần đọc.
 * @returns {Promise<object|null>} - Promise trả về thông báo hoặc null nếu không tìm thấy.
 */
async function getAnnouncementService(id) {
  try {
    const announcement = await Announcement.findByPk(id);
    if (announcement) {
      console.log("Announcement:", announcement.toJSON());
      return announcement.toJSON();
    } else {
      console.error("Announcement not found");
      return null;
    }
  } catch (error) {
    console.error("Error fetching announcement:", error);
    throw error;
  }
}

/**
 * Đọc tất cả các thông báo.
 * @returns {Promise<object[]>} - Promise trả về một mảng các thông báo.
 */
async function getAllAnnouncementsService() {
  try {
    const allAnnouncements = await Announcement.findAll();
    return allAnnouncements.map((announcement) => announcement.toJSON());
  } catch (error) {
    console.error("Error fetching announcements:", error);
    throw error;
  }
}

/**
 * Lấy danh sách thông báo chung.
 * @param {number} [limit=null] - Số lượng thông báo tối đa để trả về.
 * @param {number} [offset=0] - Số thông báo bỏ qua.
 * @returns {Promise<object[]>} - Promise trả về một mảng các thông báo.
 */
async function getGeneralAnnouncementsService(limit = null, offset = 0) {
  try {
    const queryOptions = {
      where: { IsGeneral: 1 },
      offset: offset,
    };
    if (limit !== null && limit !== undefined) {
      queryOptions.limit = parseInt(limit);
    }

    const allAnnouncements = await Announcement.findAll(queryOptions);
    return allAnnouncements.map((announcement) => announcement.toJSON());
  } catch (error) {
    console.error("Error fetching announcements:", error);
    throw error;
  }
}

/**
 * Lọc thông báo.
 * @param {string} userID - ID của người dùng.
 * @param {Date|null} [date=null] - Ngày để lọc thông báo.
 * @param {string|null} [status=null] - Trạng thái để lọc thông báo.
 * @param {number} [limit=10] - Số lượng thông báo tối đa để trả về.
 * @param {number} [offset=0] - Số thông báo bỏ qua.
 * @returns {Promise<object>} - Promise trả về một object chưa mảng các thông báo và số lượng thông báo chưa đọc.
 */
async function getAnnouncementsByUserIDService(
  userID,
  date = null,
  status = null,
  limit = null,
  offset = 0
) {
  try {
    // Xây dựng điều kiện truy vấn linh hoạt
    const whereConditions = { RecipientID: userID };
    if (status) {
      whereConditions.Status = status;
    }
    if (date) {
      whereConditions.CreatedAt = { [Op.gte]: date };
    }

    const queryOptions = {
      where: whereConditions,
      include: [{ model: Announcement }],
      offset: offset,
    };

    if (limit !== null && limit !== undefined) {
      queryOptions.limit = parseInt(limit);
    }

    const allAnnouncements = await AnnouncementRecipient.findAll(queryOptions);

    const unseenCountConditions = { RecipientID: userID, Status: "Not seen" };
    const unseenCount = await AnnouncementRecipient.count({
      where: unseenCountConditions,
    });

    return {
      announcements: allAnnouncements.map((announcement) =>
        announcement.toJSON()
      ),
      unseenCount: unseenCount,
    };
  } catch (error) {
    console.error("Error fetching announcements:", error);
    throw error;
  }
}

/**
 * Đếm số lượng thông báo.
 * @param {string} userID - ID của người dùng.

 * @returns {Promise<object>} - Promise trả về số lượng thông báo của người dùng.
 */
async function countAnnouncementsService(userID) {
  try {
    // Xây dựng điều kiện truy vấn linh hoạt
    const whereConditions = { RecipientID: userID };

    const allAnnouncementsCount = await AnnouncementRecipient.count({
      where: whereConditions,
      include: [{ model: Announcement }],
    });

    return {
      allAnnouncementsCount: allAnnouncementsCount,
    };
  } catch (error) {
    console.error("Error fetching announcements:", error);
    throw error;
  }
}

/**
 * Cập nhật một thông báo.
 * @param {number} id - ID của thông báo cần cập nhật.
 * @param {string} title - Tiêu đề mới của thông báo.
 * @param {string} content - Nội dung mới của thông báo.
 * @returns {Promise<object|null>} - Promise trả về thông báo được cập nhật hoặc null nếu không tìm thấy.
 */
async function updateAnnouncementService(id, title = null, content = null) {
  try {
    const announcement = await Announcement.findByPk(id);
    if (announcement) {
      if (title !== null) {
        announcement.Title = title;
      }
      if (content !== null) {
        announcement.Content = content;
      }
      await announcement.save();
      console.log("Announcement updated successfully:", announcement.toJSON());
      return announcement.toJSON();
    } else {
      console.error("Announcement not found");
      return null;
    }
  } catch (error) {
    console.error("Error updating announcement:", error);
    throw error;
  }
}

/**
 * Cập nhật trạng thái của AnnouncementRecipient.
 * @param {number} announcementId - ID của thông báo.
 * @param {number} recipientId - ID của người nhận thông báo.
 * @param {string} status - Trạng thái mới của thông báo.
 * @returns {Promise<object|null>} - Promise trả về AnnouncementRecipient được cập nhật hoặc null nếu không tìm thấy.
 */
async function updateAnnouncementRecipient(
  announcementId,
  recipientId,
  status
) {
  try {
    // Tìm AnnouncementRecipient dựa trên AnnouncementID và RecipientID
    const announcementRecipient = await AnnouncementRecipient.findOne({
      where: {
        AnnouncementID: announcementId,
        RecipientID: recipientId,
      },
    });

    if (announcementRecipient) {
      // Cập nhật trạng thái nếu trường status được cung cấp
      if (status !== undefined) {
        announcementRecipient.Status = status;
      }

      // Lưu thay đổi và trả về AnnouncementRecipient đã cập nhật
      await announcementRecipient.save();
      return announcementRecipient.toJSON();
    } else {
      console.error("AnnouncementRecipient not found");
      return null;
    }
  } catch (error) {
    console.error("Error updating AnnouncementRecipient:", error);
    throw error;
  }
}

/**
 * Xóa một thông báo.
 * @param {number} id - ID của thông báo cần xóa.
 * @returns {Promise<void>}
 */
async function deleteAnnouncementService(id) {
  try {
    const announcement = await Announcement.findByPk(id);
    if (announcement) {
      await announcement.destroy();
      console.log("Announcement deleted successfully");
    } else {
      console.error("Announcement not found");
    }
  } catch (error) {
    console.error("Error deleting announcement:", error);
    throw error;
  }
}

export {
  createAnnouncementService,
  getAnnouncementService,
  getAllAnnouncementsService,
  countAnnouncementsService,
  updateAnnouncementService,
  deleteAnnouncementService,
  getAnnouncementsByUserIDService,
  getGeneralAnnouncementsService,
  updateAnnouncementRecipient,
};
