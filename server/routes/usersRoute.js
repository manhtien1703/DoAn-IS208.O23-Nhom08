import express from "express";
import {
  createNewUser,
  getAllUsers,
  getUserByEmail,
  getUsersByDepartmentID,
  login,
  updateUser,
} from "../controller/userController.js";
import upload from "../configs/multerConfig.js";
import {
  countUsersAnnouncements,
  getUsersAnnouncements,
  updateAnnouncementStatus,
} from "../controller/announcementController.js";
import { getAllUserLeaveRequest } from "../controller/leaveRequestController.js";
const usersRoute = express.Router();

// Định nghĩa các tuyến đường cho /users

usersRoute.get("/getall", getAllUsers);

usersRoute.get("/email/:email", getUserByEmail);

usersRoute.get("/department/:departmentid", getUsersByDepartmentID);

usersRoute.post("/add", upload.single("avatar"), createNewUser);

usersRoute.post("/update", upload.single("avatar"), updateUser);

usersRoute.post("/login", login);

usersRoute.get("/announcement", getUsersAnnouncements);

usersRoute.put(
  "/announcement/:announcementid/:userid",
  updateAnnouncementStatus
);

usersRoute.get("/announcement/count", countUsersAnnouncements);

usersRoute.get("/leave-request", getAllUserLeaveRequest);

export default usersRoute;
