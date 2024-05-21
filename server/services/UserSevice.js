import Employee from "../models/Employee.js";

/**
 * Lấy thông tin người dùng bằng email
 * @param {string} email - Email của người dùng
 * @param {Object} req - Request object từ Express
 * @returns {Promise<Object>} - Trả về thông tin người dùng cùng với avatar
 */
const getUser = async (email, req) => {
  try {
    const user = await Employee.findOne({
      where: {
        Email: email,
      },
    });

    if (!user) {
      throw new Error("Không tìm thấy người dùng với email này.");
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
    };
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
const addUser = async (userData) => {
  try {
    const newUser = await Employee.create(userData);
    return newUser;
  } catch (error) {
    console.error("Không thể thêm người dùng:", error);
    throw error;
  }
};

/**
 * Lấy tất cả người dùng
 * @returns {Promise<Array>} - Trả về danh sách tất cả người dùng
 */
const getAllUsers = async () => {
  try {
    const users = await Employee.findAll();
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
const updateUser = async (userId, newData) => {
  try {
    const user = await Employee.findByPk(userId);
    if (!user) {
      throw new Error("Không tìm thấy người dùng để cập nhật.");
    }
    await user.update(newData);
    return user;
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
const deleteUser = async (userId) => {
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

export { getUser, addUser, getAllUsers, updateUser, deleteUser };
