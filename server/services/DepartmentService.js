/**
 * Lấy tất cả người dùng
 * @returns {Promise<Array>} - Trả về danh sách tất cả người dùng
 */
const getAllDepartment = async () => {
  try {
    const departments = await Department.findAll();
    return departments;
  } catch (error) {
    console.error("Không thể lấy danh sách người dùng:", error);
    throw error;
  }
};

export { getAllDepartment };
