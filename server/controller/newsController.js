import { getAllNewsService, getNewsService } from "../services/newsService.js";

export const getAllNews = async (req, res) => {
  try {
    const newsList = await getAllNewsService();
    res.status(200).json({
      status: "success",
      message: "Lấy danh sách tin tức thành công",
      newsList: newsList,
    });
  } catch (error) {
    res.status(404).json({
      status: "error",
      message: error.message,
    });
  }
};

export const getNews = async (req, res) => {
  try {
    const id = req.params.id;
    const news = await getNewsService(id);
    res.status(200).json({
      status: "success",
      message: "Lấy tin tức thành công",
      news: news,
    });
  } catch (error) {
    res.status(404).json({
      status: "error",
      message: "Không tìm thấy",
    });
  }
};
