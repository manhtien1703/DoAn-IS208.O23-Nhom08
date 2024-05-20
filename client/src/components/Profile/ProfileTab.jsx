import { useEffect, useState } from "react";

const ProfileTab = () => {
  const [userInfo, setUserInfo] = useState({});
  useEffect(() => {
    setUserInfo((prevState) => ({
      ...prevState,
      name: "Lê Công Hiếu",
      email: "zxcv08122003@gmail.com",
      cccd: "0123812791242",
      phone: "02938743842",
      positon: "Nhân viên",
    }));
  }, []);

  return (
    <>
      <div className="flex-1 p-4">
        <div className=" p-4 ">
          <div className="flex items-center space-x-4 mb-4">
            <div className="flex-shrink-0">
              <img
                src="https://placehold.co/100x100"
                alt="Profile Picture"
                className="rounded-full"
              />
            </div>
            <div>
              <h3 className="text-xl font-semibold">{userInfo.name}</h3>
              <button className="mt-2 bg-orange-500 text-white px-3 py-1 rounded">
                Thay ảnh đại diện
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-zinc-700">
                Chức vụ
              </label>
              <input
                type="text"
                value={userInfo.name}
                className="mt-1 block w-full px-3 py-2 border border-zinc-300 rounded-md"
                disabled
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-700">
                CCCD
              </label>
              <input
                type="text"
                value={userInfo.cccd}
                className="mt-1 block w-full px-3 py-2 border border-zinc-300 rounded-md"
                disabled
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-700">
                Email
              </label>
              <input
                type="email"
                value={userInfo.email}
                className="mt-1 block w-full px-3 py-2 border border-zinc-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-700">
                Điện thoại
              </label>
              <input
                type="text"
                value={userInfo.phone}
                className="mt-1 block w-full px-3 py-2 border border-zinc-300 rounded-md"
              />
            </div>
          </div>
          <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md">
            CẬP NHẬT
          </button>
        </div>
      </div>
    </>
  );
};

export default ProfileTab;
