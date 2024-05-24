import { getLeaveRequestByUserID } from "../services/leaveRequestService.js";

export const getAllUserLeaveRequest = async (req, res) => {
  try {
    const { EmployeeID, limit, offset } = req.query;
    const leaveRequest = await getLeaveRequestByUserID(
      EmployeeID,
      limit,
      offset
    );

    res.status(200).json({
      status: "success",
      message: "Lấy danh sách yêu cầu nghỉ phép thành công",
      leaveRequest: leaveRequest,
    });
  } catch (error) {
    res.status(404).json({
      status: "error",
      message: error.message,
    });
  }
};
