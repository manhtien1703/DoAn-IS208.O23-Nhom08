import express from "express";
import { creatNewUser, getUserByEmail } from "../controller/userController.js";
import upload from "../configs/multerConfig.js";
const usersRoute = express.Router();

// Định nghĩa các tuyến đường cho /users

// GET /users
usersRoute.get("/", (req, res) => {
  res.send("Trang danh sách người dùng");
});

// GET /users/:email
usersRoute.get("/:email", getUserByEmail);

usersRoute.post("/add", upload.single("avatar"), creatNewUser);

export default usersRoute;
