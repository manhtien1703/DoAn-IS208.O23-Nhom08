// Import các module và package cần thiết
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import { connectDatabase } from "./configs/DBConfig.js";
import router from "./routes/routes.js";
import path from "path";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import rateLimit from "express-rate-limit";
import upload from "./configs/multerConfig.js";
import cheerio from "cheerio";
import { base64ToFile } from "./middleware/uploadImages.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load biến môi trường từ file .env
dotenv.config();

// Khởi tạo express app
const app = express();

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 phút
  max: 100, // Giới hạn mỗi IP chỉ thực hiện 100 yêu cầu trong mỗi cửa sổ 15 phút
  message: "Quá nhiều yêu cầu từ IP này, vui lòng thử lại sau 15 phút.",
});

// Sử dụng body-parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Sử dụng cors middleware
app.use(cors());

// Kết nối tới cơ sở dữ liệu
connectDatabase();

// Define routes
// Endpoint để phục vụ các tệp từ thư mục uploads
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/", router);

app.post("/quill-upload-test", upload.array("images", 10), async (req, res) => {
  const { editorData } = req.body;
  const uploadedImages = req.files?.map((file) => file.filename);
  console.log("uploadedImages ", uploadedImages);

  const host = req.get("host");
  const protocol = req.protocol;

  console.log("Host: ", host, "protocol: ", protocol);

  const modifiedEditorData = await editorData?.replace(
    /src="data:image\/[^;]+;base64[^"]+"/g,
    () => {
      return `src="${protocol}://${host}/uploads/${uploadedImages.shift()}"`;
    }
  );
  console.log(modifiedEditorData);
  res.json({ editorData: modifiedEditorData });
});

// Set port và lắng nghe yêu cầu từ client
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
