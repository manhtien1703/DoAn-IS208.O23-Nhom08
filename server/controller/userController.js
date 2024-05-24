import {
  addUserService,
  getAllUsersService,
  getUserService,
  getUsersByDepartmentIDService,
  updateUserService,
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
    const {
      FullName,
      Email,
      PhoneNumber,
      DepartmentID,
      CCCD,
      Password,
      DateOfBirth,
    } = req.body;
    const Avatar = path.basename(req.file.path);
    const result = await addUserService(
      {
        FullName,
        Email,
        PhoneNumber,
        DepartmentID,
        CCCD,
        Password,
        Avatar,
        DateOfBirth,
      },
      req
    );
    if (result) {
      res.status(200).json({
        status: "success",
        message: "Email đã tồn tại",
        data: result,
      });
    } else {
      res.status(200).json({
        status: "success",
        message: "Thêm nhân viên thành công",
        data: result,
      });
    }
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
 * Cập nhật thông tin người dùng
 * @param {Object} req - Request object từ Express
 * @param {Object} res - Response object từ Express
 */
export const updateUser = async (req, res) => {
  try {
    const {
      EmployeeID,
      FullName,
      Email,
      PhoneNumber,
      DepartmentID,
      CCCD,
      Password,
      DateOfBirth,
    } = req.body;

    let Avatar;
    if (req.file) {
      Avatar = path.basename(req.file.path);
    }
    const result = await updateUserService(
      EmployeeID,
      {
        FullName,
        Email,
        PhoneNumber,
        DepartmentID,
        CCCD,
        Password,
        Avatar,
        DateOfBirth,
      },
      req
    );
    res.status(200).json({
      status: "success",
      message: "Cập nhật nhân viên thành công",
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
