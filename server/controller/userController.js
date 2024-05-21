import { addUser, getUser } from "../services/UserSevice.js";
import path from "path";
import fs from "fs";

/**
 * Lấy thông tin người dùng bằng email
 * @param {Object} req - Request object từ Express
 * @param {Object} res - Response object từ Express
 */
const getUserByEmail = async (req, res) => {
  try {
    const email = req.params.email;
    const user = await getUser(email, req);
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
 * Tạo người dùng mới
 * @param {Object} req - Request object từ Express
 * @param {Object} res - Response object từ Express
 */
const creatNewUser = async (req, res) => {
  try {
    const { FullName, Email, PhoneNumber, DepartmentID, CCCD, Password } =
      req.body;
    const Avatar = path.basename(req.file.path);
    const result = await addUser({
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

export { getUserByEmail, creatNewUser };
