import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { slugify } from "../../../utils";

const News = {
  title: "Hợp tác",
  thumb: "https://placehold.co/600x400",
  createdOn: "20-10-2024",
  content:
    "This is a short description of the news article. It provides a brief summary to entice the reader to click and read more.",
};

const NewsCard = ({ news }) => {
  return (
    <div className="max-w-sm w-[300px] mx-auto bg-white dark:bg-zinc-800 shadow-lg rounded-sm">
      <Link to={`/news/${slugify(news.title)}`}>
        <img
          className="w-[250px] h-48 object-cover"
          src={news?.thumb}
          alt="title"
        />
        <div className="p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-zinc-800 dark:text-zinc-100">
              {news?.title}
            </h2>
            <span className="text-sm text-zinc-600 dark:text-zinc-400">
              {news?.createdOn}
            </span>
          </div>
          <p className="mt-2 w-full text-zinc-600 dark:text-zinc-400 truncate overflow-hidden">
            {news?.content}
          </p>
        </div>
      </Link>
    </div>
  );
};

NewsCard.propTypes = {
  news: PropTypes.object.isRequired,
};

export default NewsCard;
