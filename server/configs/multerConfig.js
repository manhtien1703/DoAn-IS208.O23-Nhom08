// config/multerConfig.js
import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const uploadDirectory = path.join(__dirname, "../uploads");

// Kiểm tra và tạo thư mục tải lên nếu chưa tồn tại
if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory, { recursive: true });
}

// Cấu hình multer để lưu trữ tệp vào thư mục tải lên
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDirectory);
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// Khởi tạo middleware multer với cấu hình lưu trữ đã được định nghĩa
const upload = multer({ storage: storage });

export default upload;
