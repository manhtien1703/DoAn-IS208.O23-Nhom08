import { useEffect, useRef, useState } from "react";

const ProfileTab = () => {
  const [userInfo, setUserInfo] = useState({});
  const fileInputRef = useRef(null);

  const pictureChangeButtonClick = () => {
    fileInputRef.current.click();
  };

  // Function to handle profile picture change
  const handlePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUserInfo({
          ...userInfo,
          profilePicture: e.target.result,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Process form data here (e.g., send to server)
    console.log("Form submitted:", userInfo);
  };

  useEffect(() => {
    setUserInfo((prevState) => ({
      ...prevState,
      name: "Lê Công Hiếu",
      email: "zxcv08122003@gmail.com",
      cccd: "0123812791242",
      phone: "02938743842",
      positon: "Trưởng phòng",
    }));
  }, []);

  return (
    <>
      <div className="flex-1 p-4">
        <form onSubmit={handleSubmit} className=" p-4 ">
          <div className="flex items-center space-x-4 mb-4">
            <div className="flex-shrink-0">
              <img
                src={userInfo?.profilePicture}
                alt="Profile Picture"
                className="h-[150px] w-[150px] rounded-full border-2 border-gray-700"
              />
            </div>
            <div>
              <h3 className="text-xl font-semibold">{userInfo.name}</h3>
              <button
                type="button"
                onClick={pictureChangeButtonClick}
                className="mt-2 bg-orange-500 text-white px-3 py-1 rounded"
              >
                Chọn ảnh đại diện
              </button>
              {/* Hidden file input */}
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handlePictureChange}
                style={{ display: "none" }}
              />
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
        </form>
      </div>
    </>
  );
};

export default ProfileTab;
