import express from "express";
import {
  getAllRooms,
  getRoomSchedule,
} from "../controller/meetingRoomController.js";

const meetingRoomRoute = express.Router();

meetingRoomRoute.get("/", getAllRooms);

meetingRoomRoute.get("/:id/:date", getRoomSchedule);

export default meetingRoomRoute;
