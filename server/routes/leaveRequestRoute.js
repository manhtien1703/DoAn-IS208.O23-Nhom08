import express from "express";
import {
  createNewLeaveRequest,
  getAllUserLeaveRequest,
} from "../controller/leaveRequestController.js";

const leaveRequestRoute = express.Router();

leaveRequestRoute.get("/", getAllUserLeaveRequest);

leaveRequestRoute.post("/add", createNewLeaveRequest);

export default leaveRequestRoute;
