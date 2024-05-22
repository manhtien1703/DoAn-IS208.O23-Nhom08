import News from "../models/News.js";

/**
 * Tạo một tin tức mới.
 * @param {string} title - Tiêu đề của tin tức mới.
 * @param {string} content - Nội dung của tin tức mới.
 * @returns {Promise<void>}
 */
async function createNewsService(title, content) {
  try {
    const news = await News.create({
      Title: title,
      Content: content,
    });
    console.log("New news created:", news.toJSON());
  } catch (error) {
    console.error("Error creating news:", error);
  }
}

/**
 * Lấy tin tức theo id.
 * @returns {Promise<object>} - Promise trả về một mảng các tin tức.
 */
async function getNewsService(id) {
  try {
    const news = await News.findByPk(id);
    if (news) {
      // Convert CreatedAt and UpdatedAt to ISO strings
      news.CreatedAt = news.CreatedAt.toISOString();
      news.UpdatedAt = news.UpdatedAt.toISOString();

      console.log("news:", news.toJSON());
      return news.toJSON();
    } else {
      console.log("News not found");
      return null;
    }
  } catch (error) {
    console.error("Error fetching news:", error);
    throw error;
  }
}

/**
 * Đọc tất cả các tin tức.
 * @returns {Promise<object[]>} - Promise trả về một mảng các tin tức.
 */
async function getAllNewsService() {
  try {
    const allNews = await News.findAll();
    console.log(
      "All news:",
      allNews.map((news) => news.toJSON())
    );
    return allNews.map((news) => news.toJSON());
  } catch (error) {
    console.error("Error fetching news:", error);
    throw error;
  }
}

/**
 * Cập nhật một tin tức.
 * @param {number} id - ID của tin tức cần cập nhật.
 * @param {string} title - Tiêu đề mới của tin tức.
 * @param {string} content - Nội dung mới của tin tức.
 * @returns {Promise<void>}
 */
async function updateNewsService(id, title, content) {
  try {
    const news = await News.findByPk(id);
    if (news) {
      news.Title = title;
      news.Content = content;
      await news.save();
      console.log("News updated successfully:", news.toJSON());
    } else {
      console.error("News not found");
    }
  } catch (error) {
    console.error("Error updating news:", error);
  }
}

/**
 * Xóa một tin tức.
 * @param {number} id - ID của tin tức cần xóa.
 * @returns {Promise<void>}
 */
async function deleteNewsService(id) {
  try {
    const news = await News.findByPk(id);
    if (news) {
      await news.destroy();
      console.log("News deleted successfully");
    } else {
      console.error("News not found");
    }
  } catch (error) {
    console.error("Error deleting news:", error);
  }
}

export {
  createNewsService,
  getNewsService,
  updateNewsService,
  deleteNewsService,
  getAllNewsService,
};
