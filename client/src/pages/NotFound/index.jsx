import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex w-screen flex-col items-center justify-center  bg-white px-4 py-8">
      <img
        src="/images/404.png"
        alt="Error Illustration"
        className="mb-8 w-64"
      />
      <h1 className="text-2xl font-semibold text-zinc-800 mb-2">
        Chúng tôi xin lỗi vì sự bất tiện này...
      </h1>
      <p className="text-zinc-600 mb-6 text-center">
        Trang bạn tìm không tồn tại. Vui lòng quay trở lại trang chủ.
      </p>
      <Link
        to="/"
        className="bg-blue-500 hover:bg-orange-100 hover:border-dashed text-white font-bold py-2 px-4 rounded"
      >
        QUAY LẠI TRANG CHỦ
      </Link>
    </div>
  );
};
export default NotFound;
