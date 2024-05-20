import Announcement from "./models/Announcement";

/**
 * Tạo một thông báo mới.
 * @param {string} title - Tiêu đề của thông báo mới.
 * @param {string} content - Nội dung của thông báo mới.
 * @returns {Promise<object>} - Promise trả về thông báo được tạo.
 */
async function createAnnouncement(title, content) {
  try {
    const announcement = await Announcement.create({
      Title: title,
      Content: content,
    });
    console.log("New announcement created:", announcement.toJSON());
    return announcement.toJSON();
  } catch (error) {
    console.error("Error creating announcement:", error);
    throw error;
  }
}

/**
 * Đọc một thông báo dựa trên ID.
 * @param {number} id - ID của thông báo cần đọc.
 * @returns {Promise<object|null>} - Promise trả về thông báo hoặc null nếu không tìm thấy.
 */
async function getAnnouncement(id) {
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
async function getAllAnnouncements() {
  try {
    const allAnnouncements = await Announcement.findAll();
    console.log(
      "All announcements:",
      allAnnouncements.map((announcement) => announcement.toJSON())
    );
    return allAnnouncements.map((announcement) => announcement.toJSON());
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
async function updateAnnouncement(id, title, content) {
  try {
    const announcement = await Announcement.findByPk(id);
    if (announcement) {
      announcement.Title = title;
      announcement.Content = content;
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
 * Xóa một thông báo.
 * @param {number} id - ID của thông báo cần xóa.
 * @returns {Promise<void>}
 */
async function deleteAnnouncement(id) {
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
  createAnnouncement,
  getAnnouncement,
  getAllAnnouncements,
  updateAnnouncement,
  deleteAnnouncement,
};
