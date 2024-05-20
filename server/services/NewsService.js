import News from "./models/News";

/**
 * Tạo một tin tức mới.
 * @param {string} title - Tiêu đề của tin tức mới.
 * @param {string} content - Nội dung của tin tức mới.
 * @returns {Promise<void>}
 */
async function createNews(title, content) {
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
 * Đọc tất cả các tin tức.
 * @returns {Promise<object>} - Promise trả về một mảng các tin tức.
 */
async function getNews(id) {
  try {
    const news = await News.findByPk(id);
    console.log("news:", news.toJSON());
    return news.toJSON();
  } catch (error) {
    console.error("Error fetching news:", error);
    throw error;
  }
}

/**
 * Đọc tất cả các tin tức.
 * @returns {Promise<object[]>} - Promise trả về một mảng các tin tức.
 */
async function getAllNews() {
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
async function updateNews(id, title, content) {
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
async function deleteNews(id) {
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

export { createNews, getNews, getAllNews, updateNews, deleteNews };
