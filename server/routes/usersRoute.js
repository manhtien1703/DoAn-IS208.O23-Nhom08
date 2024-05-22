import express from "express";
import {
  countUsersAnnouncements,
  createNewUser,
  getAllUsers,
  getUserByEmail,
  getUsersAnnouncements,
  getUsersByDepartmentID,
  login,
  updateAnnouncementStatus,
} from "../controller/userController.js";
import upload from "../configs/multerConfig.js";
const usersRoute = express.Router();

// Định nghĩa các tuyến đường cho /users

usersRoute.get("/getall", getAllUsers);

usersRoute.get("/email/:email", getUserByEmail);

usersRoute.get("/department/:departmentid", getUsersByDepartmentID);

usersRoute.post("/add", upload.single("avatar"), createNewUser);

usersRoute.post("/login", login);

usersRoute.get("/announcement", getUsersAnnouncements);

usersRoute.put(
  "/announcement/:announcementid/:userid",
  updateAnnouncementStatus
);

usersRoute.get("/announcement/count", countUsersAnnouncements);

export default usersRoute;
