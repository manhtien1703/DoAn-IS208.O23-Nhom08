import { Link } from "react-router-dom";
import NewsCard from "../../components/News/NewsCard/NewsCard";
import Footer from "../../layouts/DefaultLayout/Footer";
import Header from "../../layouts/DefaultLayout/Header";
import { useEffect, useState } from "react";
import axios from "axios";
import { serverURL } from "../../utils/server";
import Notify from "../../components/Toast/Notify";
import DefaultLayout from "../../layouts/DefaultLayout";

const notifications = [
  {
    title: "Thông báo Danh sách sinh viên dự kiến TN đợt 2 năm 2024",
    time: "14/05/2024 - 14:26",
  },
  {
    title: "Kế hoạch xét tốt nghiệp đợt 02 năm 2024",
    time: "10/04/2024 - 11:14",
  },
  {
    title: "Thông báo lịch thi tập trung Giữa kỳ học kỳ 2 năm học 2023-2024",
    time: "22/03/2024 - 08:18",
  },
  {
    title:
      "Thông báo lịch thi Viết và Vấn đáp cuối kỳ các môn Anh văn học kỳ 1 năm học 2023-2024 của khóa K18",
    time: "18/12/2023 - 10:58",
  },
  {
    title: "Kỳ thi Olympic Toán học sinh viên và học sinh Toàn quốc 2024",
    time: "17/10/2023 - 08:07",
  },
  {
    title: "Thông báo v/v triển khai thanh toán giữ xe máy theo tháng",
    time: "02/10/2023 - 15:54",
  },
  {
    title: "Kế hoạch xét tốt nghiệp đợt 04 năm 2023",
    time: "29/09/2023 - 14:43",
  },
  {
    title:
      "Thông báo V/v công nhận môn tương đương giữa các môn học Giáo dục thể chất",
    time: "15/09/2023 - 08:15",
  },
  {
    title:
      "Thông báo thông tin về Buổi tư vấn tuyển sinh Chương trình đào tạo trình độ thạc sĩ đợt 1 năm 2024",
    time: "02/05/2024 - 13:56",
  },
  {
    title:
      "Thông báo về buổi tư vấn tuyển sinh Chương trình đào tạo trình độ thạc sĩ đợt 1 năm 2024",
    time: "02/05/2024 - 11:35",
  },
];

const Home = () => {
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

  return (
    <DefaultLayout>
      <div className="min-h-screen md:px-10 bg-zinc-100 dark:bg-zinc-800">
        <div className="gap-4 p-4">
          <div className="bg-white dark:bg-zinc-700 shadow rounded-lg p-4 mb-4">
            <h2 className="font-bold text-xl mb-2">THÔNG BÁO CHUNG</h2>
            <ul>
              {notifications.map((notification, index) => (
                <li className="mb-2" key={index}>
                  <a href="#" className="text-blue-500 hover:text-blue-600">
                    {notification.title}

                    <span className="text-gray-500">
                      {" "}
                      - {notification.time}
                    </span>
                  </a>
                </li>
              ))}

              <li className="mb-1 mt-4 text-lg flex justify-end">
                <a href="#" className="text-blue-500 hover:text-blue-600">
                  Xem thêm »
                </a>
              </li>
            </ul>
          </div>
          <div className="bg-white dark:bg-zinc-700 shadow rounded-lg p-4">
            <h2 className="font-bold text-xl mb-2">Tin nổi bật</h2>
            <h1 className="text-3xl font-bold text-center my-8">Latest News</h1>
            <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-4">
              {newsData.length === 0 ? (
                <p>Không có tin tức mới</p>
              ) : (
                newsData.map((news, index) => (
                  <NewsCard key={index} news={news} />
                ))
              )}
            </div>
            <div className="mb-1 mt-4 text-lg flex justify-end">
              <Link to="/news" className="text-blue-500 hover:text-blue-600">
                Xem thêm »
              </Link>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Home;
