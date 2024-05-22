import express from "express";
import {
  getAllAnnouncements,
  getAnnouncement,
} from "../controller/announcementController.js";

const announcementRoute = express.Router();

announcementRoute.get("/", getAllAnnouncements);

announcementRoute.get("/:id", getAnnouncement);

export default announcementRoute;
