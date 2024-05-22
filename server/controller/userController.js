import {
  addUserService,
  getAllUsersService,
  getUserService,
  getUsersByDepartmentIDService,
} from "../services/userService.js";
import {
  countAnnouncementsService,
  getAnnouncementsByUserIDService,
  updateAnnouncementRecipient,
  updateAnnouncementService,
} from "../services/announcementService.js";
import path from "path";
import fs from "fs";

/**
 * Lấy thông tin người dùng bằng email
 * @param {Object} req - Request object từ Express
 * @param {Object} res - Response object từ Express
 */
export const getAllUsers = async (req, res) => {
  try {
    const users = await getAllUsersService();
    res.status(200).json({
      status: "success",
      message: "Lấy danh sách người dùng thành công",
      data: users,
    });
  } catch (error) {
    res.status(404).json({
      status: "error",
      message: error.message,
    });
  }
};

/**
 * Lấy thông tin người dùng bằng DepartmentID
 * @param {Object} req - Request object từ Express
 * @param {Object} res - Response object từ Express
 */
export const getUsersByDepartmentID = async (req, res) => {
  try {
    const departmentID = req.params.departmentid;
    const users = await getUsersByDepartmentIDService(departmentID, req);
    res.status(200).json({
      status: "success",
      message: "Lấy danh sách người dùng thành công",
      data: users,
    });
  } catch (error) {
    res.status(404).json({
      status: "error",
      message: error.message,
    });
  }
};

/**
 * Lấy thông tin người dùng bằng email
 * @param {Object} req - Request object từ Express
 * @param {Object} res - Response object từ Express
 */
export const getUserByEmail = async (req, res) => {
  try {
    const email = req.params.email;
    const user = await getUserService(email, req);
    res.status(200).json({
      status: "success",
      message: "Lấy thông tin người dùng thành công",
      data: user,
    });
  } catch (error) {
    res.status(404).json({
      status: "error",
      message: error.message,
    });
  }
};

/**
 * đăng nhập
 * @param {Object} req - Request object từ Express
 * @param {Object} res - Response object từ Express
 */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("req:", req.body);
    const user = await getUserService(email, req);
    if (user?.Password !== password) {
      res.status(200).json({
        status: "error",
        message: "Thông tin không chính xác",
        user: {},
      });
    } else {
      res.status(200).json({
        status: "success",
        message: "Đăng nhập thành công",
        user: user,
      });
    }
  } catch (error) {
    res.status(404).json({
      status: "error",
      message: error.message,
    });
  }
};

/**
 * Tạo người dùng mới
 * @param {Object} req - Request object từ Express
 * @param {Object} res - Response object từ Express
 */
export const createNewUser = async (req, res) => {
  try {
    const { FullName, Email, PhoneNumber, DepartmentID, CCCD, Password } =
      req.body;
    const Avatar = path.basename(req.file.path);
    const result = await addUserService({
      FullName,
      Email,
      PhoneNumber,
      DepartmentID,
      CCCD,
      Password,
      Avatar,
    });
    res.status(200).json({
      status: "success",
      message: "Thêm nhân viên thành công",
      data: result,
    });
  } catch (error) {
    if (req.file && req.file.path) {
      fs.unlink(req.file.path, (err) => {
        if (err) {
          console.error("Error deleting uploaded file:", err);
        }
        console.log("Uploaded file deleted successfully");
      });
    }

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
  console.log(req.body);

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
