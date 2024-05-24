import {
  createLeaveRequest,
  getLeaveRequestByUserID,
} from "../services/leaveRequestService.js";

export const getAllUserLeaveRequest = async (req, res) => {
  try {
    const { EmployeeID, limit, offset } = req.query;
    const leaveRequests = await getLeaveRequestByUserID(
      EmployeeID,
      limit,
      offset
    );

    res.status(200).json({
      status: "success",
      message: "Lấy danh sách yêu cầu nghỉ phép thành công",
      leaveRequest: leaveRequests,
    });
  } catch (error) {
    res.status(404).json({
      status: "error",
      message: error.message,
    });
  }
};

export const createNewLeaveRequest = async (req, res) => {
  try {
    const { EmployeeID, StartDate, EndDate, Reason } = req.body;
    const leaveRequests = await createLeaveRequest(
      parseInt(EmployeeID),
      StartDate,
      EndDate,
      Reason
    );

    res.status(200).json({
      status: "success",
      message: "Tạo yêu cầu nghỉ phép thành công",
      leaveRequest: leaveRequests,
    });
  } catch (error) {
    res.status(404).json({
      status: "error",
      message: error.message,
    });
  }
};
