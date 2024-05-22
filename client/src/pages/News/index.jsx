import { useEffect, useState } from "react";
import NewsList from "../../components/News/NewsList/NewsList";
import axios from "axios";
import Notify from "../../components/Toast/Notify";
import { serverURL } from "../../utils/server";
import DefaultLayout from "../../layouts/DefaultLayout";

const News = () => {
  const [newsData, setNewsData] = useState([]);

  useEffect(() => {
    const getNews = async () => {
      try {
        const result = await axios.get(`${serverURL}/news`);
        const limitedNews = result.data.newsList.slice(0, 8);
        setNewsData(limitedNews);
      } catch (error) {
        Notify("error", error.message);
      }
    };

    getNews();
  }, []);
  const itemsPerPage = 8; // Số tin tức hiển thị trên mỗi trang

  return (
    <DefaultLayout>
      <div className="container min-h-screen mx-auto my-5">
        <h1 className="text-3xl font-bold text-center my-8">Latest News</h1>
        <NewsList newsList={newsData} itemsPerPage={itemsPerPage} />
      </div>
    </DefaultLayout>
  );
};

export default News;
