import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { convertDateToString, slugify } from "../../../utils";

const NewsCard = ({ news }) => {
  return (
    <div className="max-w-sm w-[300px] xl:w-[400px] mx-auto bg-white dark:bg-zinc-800 shadow-lg rounded-sm">
      <Link to={`/news/${slugify(news.Title)}-${news.NewsID}`}>
        <img
          className="w-[250px] h-48 object-cover mx-auto"
          src={news?.Thumb}
          alt="title"
        />
        <div className="p-4">
          <div className=" items-center justify-between">
            <div className="text-sm text-zinc-600 dark:text-zinc-400">
              {convertDateToString(new Date(news?.CreatedAt))}
            </div>
            <h2 className="text-xl font-bold text-zinc-800 dark:text-zinc-100">
              {news?.Title}
            </h2>
          </div>
          <div
            dangerouslySetInnerHTML={{ __html: news?.Content }}
            className="mt-2 w-full text-zinc-600 dark:text-zinc-400 truncate overflow-hidden truncate-container"
          ></div>
        </div>
      </Link>
    </div>
  );
};

NewsCard.propTypes = {
  news: PropTypes.object.isRequired,
};

export default NewsCard;
