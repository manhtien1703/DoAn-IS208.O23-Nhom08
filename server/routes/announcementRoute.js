import express from "express";
import {
  getAllAnnouncements,
  getAnnouncement,
  getGeneralAnnouncements,
} from "../controller/announcementController.js";

const announcementRoute = express.Router();

announcementRoute.get("/", getAllAnnouncements);

announcementRoute.get("/general", getGeneralAnnouncements);

announcementRoute.get("/:id", getAnnouncement);

export default announcementRoute;
