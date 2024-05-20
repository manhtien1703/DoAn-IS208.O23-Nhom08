import NewsList from "../../components/News/NewsList/NewsList";
import Footer from "../../layouts/DefaultLayout/Footer";
import Header from "../../layouts/DefaultLayout/Header";

const News = () => {
  const newsData = [
    {
      id: 1,
      title: "Title 1",
      thumb: "thumb1.jpg",
      createdOn: "2024-05-19",
      content: "Content 1",
    },
    {
      id: 2,
      title: "Title 2",
      thumb: "thumb2.jpg",
      createdOn: "2024-05-18",
      content: "Content 2",
    },
    {
      id: 1,
      title: "Title 1",
      thumb: "thumb1.jpg",
      createdOn: "2024-05-19",
      content: "Content 1",
    },
    {
      id: 2,
      title: "Title 2",
      thumb: "thumb2.jpg",
      createdOn: "2024-05-18",
      content: "Content 2",
    },
    {
      id: 1,
      title: "Title 1",
      thumb: "thumb1.jpg",
      createdOn: "2024-05-19",
      content: "Content 1",
    },
    {
      id: 2,
      title: "Title 22",
      thumb: "thumb2.jpg",
      createdOn: "2024-05-18",
      content: "Content 2",
    },
    {
      id: 1,
      title: "Title 11",
      thumb: "thumb1.jpg",
      createdOn: "2024-05-19",
      content: "Content 1",
    },
    {
      id: 2,
      title: "Title 2",
      thumb: "thumb2.jpg",
      createdOn: "2024-05-18",
      content:
        "Content 2qwieuuqwi q qweuq hq uhqheqweqehqh  qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq  hqehqh  qheq  hqeh qieh qihqhe qeh q hq hqeiq hqh eqi hq hh qiehq hqhqi h",
    },
    // Thêm dữ liệu tin tức khác ở đây...
  ];

  const itemsPerPage = 8; // Số tin tức hiển thị trên mỗi trang

  return (
    <>
      <Header />
      <div className="container min-h-screen mx-auto my-5">
        <h1 className="text-3xl font-bold text-center my-8">Latest News</h1>
        <NewsList newsList={newsData} itemsPerPage={itemsPerPage} />
      </div>
      <Footer />
    </>
  );
};

export default News;
