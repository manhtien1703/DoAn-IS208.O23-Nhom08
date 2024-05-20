// Import các module và package cần thiết
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDatabase from "./configs/DBConfig.js";

// Load biến môi trường từ file .env
dotenv.config();

// Khởi tạo express app
const app = express();

// Sử dụng body-parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Sử dụng cors middleware
app.use(cors());

// Kết nối tới cơ sở dữ liệu
connectDatabase();

// Define routes
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Set port và lắng nghe yêu cầu từ client
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
