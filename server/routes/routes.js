import express from "express";
import usersRoute from "./usersRoute.js";
import newsRoute from "./newsRoute.js";
import announcementRoute from "./announcementRoute.js";

const router = express.Router();

router.use("/users", usersRoute);
router.use("/news", newsRoute);
router.use("/announcement", announcementRoute);
export default router;
