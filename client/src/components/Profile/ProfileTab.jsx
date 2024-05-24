import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../redux/slices/authSlice";
import axios from "axios";
import { serverURL } from "../../utils/server";
import Notify from "../../components/Toast/Notify";
import { getUserInfo } from "../../redux/action/authAction";

const ProfileTab = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const [avatarURl, setAvatarURL] = useState(user.Avatar);
  const [email, setEmail] = useState(user.Email);
  const [phoneNumber, setPhoneNumber] = useState(user.PhoneNumber);
  const [dateOfBirth, setDateOfBirth] = useState(user.DateOfBirth);
  const [avatar, setAvatar] = useState(null);
  const fileInputRef = useRef(null);

  const pictureChangeButtonClick = () => {
    fileInputRef.current.click();
  };

  // Function to handle profile picture change
  const handlePictureChange = (e) => {
    setAvatar(e.target.files[0]);
    if (e.target.files[0]) {
      const reader = new FileReader(); // Tạo một FileReader để đọc tệp ảnh
      reader.onloadend = () => {
        // Xử lý khi việc đọc tệp ảnh hoàn tất
        const imageDataUrl = reader.result; // Đọc kết quả là một URL dữ liệu của ảnh
        setAvatarURL(imageDataUrl); // Cập nhật state của user với ảnh đại diện mới
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handleDateOfBirthChange = (e) => {
    setDateOfBirth(e.target.value);
    console.log(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("EmployeeID", user.EmployeeID);
    formData.append("Email", email);
    formData.append("PhoneNumber", phoneNumber);
    formData.append("DateOfBirth", dateOfBirth);
    if (avatar) {
      formData.append("avatar", avatar);
    }

    try {
      const res = await axios.post(`${serverURL}/users/update`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      dispatch(getUserInfo(res.data.data));
      Notify("success", "Cập nhật thông tin thành công");
    } catch (error) {
      Notify("error", "Cập nhật thông tin thất bại");
      console.error("Error updating user:", error);
      // Xử lý lỗi, ví dụ như hiển thị thông báo lỗi
    }
  };

  useEffect(() => {
    setAvatarURL(user.Avatar);
    setEmail(user.Email);
    setPhoneNumber(user.PhoneNumber);
    setAvatar(null);
  }, [user]);

  return (
    <>
      <div className="flex-1 p-4">
        <form onSubmit={handleSubmit} className=" p-4 ">
          <div className="flex items-center space-x-4 mb-4">
            <div className="flex-shrink-0">
              <img
                src={avatarURl}
                alt="Profile Picture"
                className="h-[150px] w-[150px] rounded-full border-2 border-gray-700"
              />
            </div>
            <div>
              <h3 className="text-xl font-semibold">{user?.name}</h3>
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
                value={user.Role}
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
                value={user.CCCD}
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
                value={email}
                onChange={handleEmailChange}
                className="mt-1 block w-full px-3 py-2 border border-zinc-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-700">
                Điện thoại
              </label>
              <input
                type="text"
                value={phoneNumber}
                onChange={handlePhoneNumberChange}
                className="mt-1 block w-full px-3 py-2 border border-zinc-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-700">
                Ngày sinh
              </label>
              <input
                type="date"
                value={dateOfBirth}
                onChange={handleDateOfBirthChange}
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
