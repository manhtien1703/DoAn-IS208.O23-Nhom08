export default function Footer() {
  return (
    <footer>
      <div className="flex flex-col items-center mx-auto p-4 border border-zinc-300">
        <h1 className="text-3xl font-bold">Công ty TNHH ABC</h1>
        <p className="text-lg mt-3">
          Khu phố 6, P.Linh Trung, Tp.Thủ Đức, Tp.Hồ Chí Minh.
        </p>
        <p className="mt-2 text-lg">
          Điện thoại: (028) 1234567, Ext: 113(Hệ từ xa qua mạng), 112(Hệ chính
          quy).
        </p>
        <p>
          Email:{" "}
          <a
            href="mailto:hieu081203@gmail.com"
            className="text-blue-500 text-lg"
          >
            hieu081203@gmail.com
          </a>
        </p>
      </div>
    </footer>
  );
}
