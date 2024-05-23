import express from "express";
import usersRoute from "./usersRoute.js";
import newsRoute from "./newsRoute.js";
import announcementRoute from "./announcementRoute.js";
import meetingRoomRoute from "./mettingRoomRoute.js";

const router = express.Router();

router.use("/users", usersRoute);
router.use("/news", newsRoute);
router.use("/announcement", announcementRoute);
router.use("/meeting-room", meetingRoomRoute);
export default router;
