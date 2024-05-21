import CrossDepartmentRequest from "./models/CrossDepartmentRequest";

/**
 * Tạo một yêu cầu giữa các phòng ban mới.
 * @param {number} fromEmployeeID - ID của nhân viên tạo yêu cầu.
 * @param {number} toDepartmentID - ID của phòng ban nhận yêu cầu.
 * @param {string} requestContent - Nội dung yêu cầu.
 * @returns {Promise<object>} - Promise trả về yêu cầu được tạo.
 */
async function createCrossDepartmentRequest(
  fromEmployeeID,
  toDepartmentID,
  requestContent
) {
  try {
    const request = await CrossDepartmentRequest.create({
      FromEmployeeID: fromEmployeeID,
      ToDepartmentID: toDepartmentID,
      RequestContent: requestContent,
    });
    console.log("New cross-department request created:", request.toJSON());
    return request.toJSON();
  } catch (error) {
    console.error("Error creating cross-department request:", error);
    throw error;
  }
}

/**
 * Đọc thông tin của một yêu cầu giữa các phòng ban dựa trên ID.
 * @param {number} requestID - ID của yêu cầu.
 * @returns {Promise<object|null>} - Promise trả về thông tin của yêu cầu hoặc null nếu không tìm thấy.
 */
async function getCrossDepartmentRequestByID(requestID) {
  try {
    const request = await CrossDepartmentRequest.findByPk(requestID);
    if (request) {
      console.log("Cross-department request found:", request.toJSON());
      return request.toJSON();
    } else {
      console.error("Cross-department request not found");
      return null;
    }
  } catch (error) {
    console.error("Error fetching cross-department request:", error);
    throw error;
  }
}

/**
 * Đọc tất cả các yêu cầu giữa các phòng ban.
 * @returns {Promise<object[]>} - Promise trả về một mảng chứa thông tin của tất cả các yêu cầu.
 */
async function getAllCrossDepartmentRequests() {
  try {
    const requests = await CrossDepartmentRequest.findAll();
    console.log(
      "All cross-department requests:",
      requests.map((request) => request.toJSON())
    );
    return requests.map((request) => request.toJSON());
  } catch (error) {
    console.error("Error fetching cross-department requests:", error);
    throw error;
  }
}

/**
 * Cập nhật thông tin của một yêu cầu giữa các phòng ban.
 * @param {number} requestID - ID của yêu cầu cần cập nhật.
 * @param {object} updatedInfo - Thông tin mới cần cập nhật.
 * @returns {Promise<void>}
 */
async function updateCrossDepartmentRequest(requestID, updatedInfo) {
  try {
    const request = await CrossDepartmentRequest.findByPk(requestID);
    if (request) {
      await request.update(updatedInfo);
      console.log(
        "Cross-department request updated successfully:",
        request.toJSON()
      );
    } else {
      console.error("Cross-department request not found");
    }
  } catch (error) {
    console.error("Error updating cross-department request:", error);
    throw error;
  }
}

/**
 * Xóa một yêu cầu giữa các phòng ban.
 * @param {number} requestID - ID của yêu cầu cần xóa.
 * @returns {Promise<void>}
 */
async function deleteCrossDepartmentRequest(requestID) {
  try {
    const request = await CrossDepartmentRequest.findByPk(requestID);
    if (request) {
      await request.destroy();
      console.log("Cross-department request deleted successfully");
    } else {
      console.error("Cross-department request not found");
    }
  } catch (error) {
    console.error("Error deleting cross-department request:", error);
    throw error;
  }
}

export {
  createCrossDepartmentRequest,
  getCrossDepartmentRequestByID,
  getAllCrossDepartmentRequests,
  updateCrossDepartmentRequest,
  deleteCrossDepartmentRequest,
};
