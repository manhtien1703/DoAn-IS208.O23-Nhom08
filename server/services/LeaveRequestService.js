import LeaveRequest from "../models/LeaveRequest.js";

/**
 * Tạo một yêu cầu nghỉ phép mới.
 * @param {number} employeeID - ID của nhân viên tạo yêu cầu.
 * @param {Date} startDate - Ngày bắt đầu của nghỉ phép.
 * @param {Date} endDate - Ngày kết thúc của nghỉ phép.
 * @param {string} reason - Lý do nghỉ phép.
 * @returns {Promise<object>} - Promise trả về yêu cầu nghỉ phép được tạo.
 */
async function createLeaveRequest(employeeID, startDate, endDate, reason) {
  try {
    const leaveRequest = await LeaveRequest.create({
      EmployeeID: employeeID,
      StartDate: startDate,
      EndDate: endDate,
      Reason: reason,
      Status: "Pending", // Set default status to 'Pending'
    });
    console.log("New leave request created:", leaveRequest.toJSON());
    return leaveRequest.toJSON();
  } catch (error) {
    console.error("Error creating leave request:", error);
    throw error;
  }
}

/**
 * Đọc một yêu cầu nghỉ phép dựa trên ID.
 * @param {number} id - ID của yêu cầu nghỉ phép cần đọc.
 * @returns {Promise<object|null>} - Promise trả về yêu cầu nghỉ phép hoặc null nếu không tìm thấy.
 */
async function getLeaveRequest(id) {
  try {
    const leaveRequest = await LeaveRequest.findByPk(id);
    if (leaveRequest) {
      console.log("Leave request:", leaveRequest.toJSON());
      return leaveRequest.toJSON();
    } else {
      console.error("Leave request not found");
      return null;
    }
  } catch (error) {
    console.error("Error fetching leave request:", error);
    throw error;
  }
}

/**
 * Đọc một yêu cầu nghỉ phép dựa trên EmployeeID.
 * @param {number} EmployeeID - ID của nhân viên .
 * @param {number} offset số yêu cầu bỏ qua.
 * @param {number} limit Giới hạn số yêu cầu được trả về.
 * @returns {Promise<object|null>} - Promise trả về yêu cầu nghỉ phép hoặc null nếu không tìm thấy.
 */
async function getLeaveRequestByUserID(EmployeeID, offset = 0, limit = null) {
  try {
    const option = {
      where: {
        EmployeeID: EmployeeID,
      },
      offset: offset,
    };
    if (limit) {
      option.limit = limit;
    }

    const leaveRequests = await LeaveRequest.findAll(option);
    return leaveRequests;
  } catch (error) {
    console.error("Error fetching leave request:", error);
    throw error;
  }
}

/**
 * Đọc tất cả các yêu cầu nghỉ phép.
 * @returns {Promise<object[]>} - Promise trả về một mảng các yêu cầu nghỉ phép.
 */
async function getAllLeaveRequests() {
  try {
    const allLeaveRequests = await LeaveRequest.findAll();
    return allLeaveRequests.map((leaveRequest) => leaveRequest.toJSON());
  } catch (error) {
    console.error("Error fetching leave requests:", error);
    throw error;
  }
}

/**
 * Cập nhật một yêu cầu nghỉ phép.
 * @param {number} id - ID của yêu cầu nghỉ phép cần cập nhật.
 * @param {Object} updatedFields - Các trường cần cập nhật (VD: { Status: 'Approved' }).
 * @returns {Promise<object|null>} - Promise trả về yêu cầu nghỉ phép được cập nhật hoặc null nếu không tìm thấy.
 */
async function updateLeaveRequest(id, updatedFields) {
  try {
    const leaveRequest = await LeaveRequest.findByPk(id);
    if (leaveRequest) {
      Object.assign(leaveRequest, updatedFields);
      await leaveRequest.save();
      console.log("Leave request updated successfully:", leaveRequest.toJSON());
      return leaveRequest.toJSON();
    } else {
      console.error("Leave request not found");
      return null;
    }
  } catch (error) {
    console.error("Error updating leave request:", error);
    throw error;
  }
}

/**
 * Xóa một yêu cầu nghỉ phép.
 * @param {number} id - ID của yêu cầu nghỉ phép cần xóa.
 * @returns {Promise<void>}
 */
async function deleteLeaveRequest(id) {
  try {
    const leaveRequest = await LeaveRequest.findByPk(id);
    if (leaveRequest) {
      await leaveRequest.destroy();
      console.log("Leave request deleted successfully");
    } else {
      console.error("Leave request not found");
    }
  } catch (error) {
    console.error("Error deleting leave request:", error);
    throw error;
  }
}

export {
  createLeaveRequest,
  getLeaveRequest,
  getLeaveRequestByUserID,
  getAllLeaveRequests,
  updateLeaveRequest,
  deleteLeaveRequest,
};
