import express from "express";
import { getAllNews, getNews } from "../controller/newsController.js";

const newsRoute = express.Router();

newsRoute.get("/", getAllNews);

newsRoute.get("/:id", getNews);

export default newsRoute;
