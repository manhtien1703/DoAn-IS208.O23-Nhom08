import Employee from "../models/Employee.js";
import fs from "fs/promises";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

/**
 * Lấy thông tin người dùng bằng email
 * @param {string} email - Email của người dùng
 * @param {Object} req - Request object từ Express
 * @returns {Promise<Object>} - Trả về thông tin người dùng cùng với avatar
 */
const getUserService = async (email, req) => {
  try {
    const user = await Employee.findOne({
      where: {
        Email: email,
      },
    });

    if (!user) {
      return null;
    }

    const host = req.get("host");
    const protocol = req.protocol;

    return {
      EmployeeID: user.EmployeeID,
      FullName: user.FullName,
      Email: user.Email,
      PhoneNumber: user.PhoneNumber,
      DepartmentID: user.DepartmentID,
      Role: user.Role,
      Avatar: user.Avatar
        ? `${protocol}://${host}/uploads/${user.Avatar}`
        : null, // Đường dẫn đầy đủ tới tệp avatar
      CreatedAt: user.CreatedAt,
      UpdatedAt: user.UpdatedAt,
      CCCD: user.CCCD,
      Password: user.Password,
      DateOfBirth: user.DateOfBirth,
    };
  } catch (error) {
    console.error("Không thể lấy thông tin người dùng:", error);
    return {};
  }
};

/**
 * Lấy thông tin người dùng bằng email
 * @param {string} email - Email của người dùng
 * @param {Object} req - Request object từ Express
 * @returns {Promise<Array<Object>>} - Trả về danh sách thông tin người dùng cùng với avatar
 */
const getUsersByDepartmentIDService = async (departmentID, req) => {
  try {
    const users = await Employee.findAll({
      where: { DepartmentID: parseInt(departmentID) },
    });

    const host = req.get("host");
    const protocol = req.protocol;

    return users.map((user) => ({
      EmployeeID: user.EmployeeID,
      FullName: user.FullName,
      Email: user.Email,
      PhoneNumber: user.PhoneNumber,
      DepartmentID: user.DepartmentID,
      Role: user.Role,
      Avatar: user.Avatar
        ? `${protocol}://${host}/uploads/${user.Avatar}`
        : null, // Đường dẫn đầy đủ tới tệp avatar
      CreatedAt: user.CreatedAt,
      UpdatedAt: user.UpdatedAt,
      CCCD: user.CCCD,
    }));
  } catch (error) {
    console.error("Không thể lấy thông tin người dùng:", error);
    throw error;
  }
};

/**
 * Thêm người dùng mới
 * @param {Object} userData - Thông tin của người dùng mới
 * @returns {Promise<Object>} - Trả về thông tin người dùng mới được thêm vào
 */
const addUserService = async (userData, req) => {
  try {
    const userWithEmail = await Employee.findOne({
      where: {
        Email: userData.Email,
      },
    });

    if (userWithEmail) {
      return null;
    }
    const user = await Employee.create(userData);
    const host = req.get("host");
    const protocol = req.protocol;

    return {
      EmployeeID: user.EmployeeID,
      FullName: user.FullName,
      Email: user.Email,
      PhoneNumber: user.PhoneNumber,
      DepartmentID: user.DepartmentID,
      Role: user.Role,
      Avatar: user.Avatar
        ? `${protocol}://${host}/uploads/${user.Avatar}`
        : null, // Đường dẫn đầy đủ tới tệp avatar
      CreatedAt: user.CreatedAt,
      UpdatedAt: user.UpdatedAt,
      CCCD: user.CCCD,
      Password: user.Password,
      DateOfBirth: user.DateOfBirth,
    };
  } catch (error) {
    console.error("Không thể thêm người dùng:", error);
    throw error;
  }
};

/**
 * Lấy tất cả người dùng
 * @returns {Promise<Array>} - Trả về danh sách tất cả người dùng
 */
const getAllUsersService = async () => {
  try {
    const users = await Employee.findAll();
    return users;
  } catch (error) {
    console.error("Không thể lấy danh sách người dùng:", error);
    throw error;
  }
};

/**
 * Lấy tất cả người dùng
 * @param {number} DepartmentID- ID của phòng ban
 * @returns {Promise<Array>} - Trả về danh sách tất cả người dùng
 */
const getUsersInDepartmentService = async (DepartmentID) => {
  try {
    const users = await Employee.findAll({
      where: { DepartmentID: DepartmentID },
    });
    return users;
  } catch (error) {
    console.error("Không thể lấy danh sách người dùng:", error);
    throw error;
  }
};

/**
 * Cập nhật thông tin của người dùng
 * @param {number} userId - ID của người dùng cần cập nhật
 * @param {Object} newData - Dữ liệu mới cần cập nhật
 * @returns {Promise<Object>} - Trả về thông tin người dùng sau khi cập nhật
 */
const updateUserService = async (userId, newData, req) => {
  try {
    const user = await Employee.findByPk(userId);
    if (!user) {
      throw new Error("Không tìm thấy người dùng để cập nhật.");
    }

    // Kiểm tra nếu có tệp tải lên
    if (req.file) {
      const __filename = fileURLToPath(import.meta.url);
      const __dirname = dirname(__filename);

      const uploadDirectory = path.join(__dirname, "../uploads");
      // Xóa ảnh cũ nếu tồn tại
      if (user.Avatar) {
        await fs.unlink(path.join(uploadDirectory, user.Avatar));
      }

      // Lưu ảnh mới vào thư mục uploads
      const avatarName = `${Date.now()}-${req.file.originalname}`;
      await fs.rename(req.file.path, path.join(uploadDirectory, avatarName));

      // Cập nhật đường dẫn avatar trong cơ sở dữ liệu
      newData.Avatar = avatarName;
    }
    await user.update(newData);
    const updatedUser = await Employee.findByPk(userId);
    const host = req.get("host");
    const protocol = req.protocol;

    return {
      EmployeeID: updatedUser.dataValues.EmployeeID,
      FullName: updatedUser.dataValues.FullName,
      Email: updatedUser.dataValues.Email,
      PhoneNumber: updatedUser.dataValues.PhoneNumber,
      DepartmentID: updatedUser.dataValues.DepartmentID,
      Role: updatedUser.dataValues.Role,
      Avatar: updatedUser.dataValues.Avatar
        ? `${protocol}://${host}/uploads/${user.Avatar}`
        : null, // Đường dẫn đầy đủ tới tệp avatar
      CreatedAt: updatedUser.dataValues.CreatedAt,
      UpdatedAt: updatedUser.dataValues.UpdatedAt,
      CCCD: updatedUser.dataValues.CCCD,
      Password: updatedUser.dataValues.Password,
      DateOfBirth: updatedUser.dataValues.DateOfBirth,
    };
  } catch (error) {
    console.error("Không thể cập nhật thông tin người dùng:", error);
    throw error;
  }
};

/**
 * Xóa người dùng
 * @param {number} userId - ID của người dùng cần xóa
 * @returns {Promise<void>}
 */
const deleteUserService = async (userId) => {
  try {
    const user = await Employee.findByPk(userId);
    if (!user) {
      throw new Error("Không tìm thấy người dùng để xóa.");
    }
    await user.destroy();
  } catch (error) {
    console.error("Không thể xóa người dùng:", error);
    throw error;
  }
};

export {
  getUserService,
  getUsersByDepartmentIDService,
  addUserService,
  getAllUsersService,
  getUsersInDepartmentService,
  updateUserService,
  deleteUserService,
};
