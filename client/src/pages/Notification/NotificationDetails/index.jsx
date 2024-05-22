import { useNavigate, useParams } from "react-router";
import DefaultLayout from "../../../layouts/DefaultLayout";
import { useEffect, useState } from "react";
import { serverURL } from "../../../utils/server";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectUser } from "../../../redux/slices/authSlice";
import { slugify } from "../../../utils";

export default function NotificationDetails() {
  const user = useSelector(selectUser);
  const { slug } = useParams();
  const navigator = useNavigate();
  const [contentHtml, setContentHtml] = useState("");
  useEffect(() => {
    const updateStatus = async () => {
      try {
        await axios.put(
          `${serverURL}/users/announcement/${slug}/${user.EmployeeID}`,
          {
            status: "Seen",
          }
        );
      } catch (error) {
        if (error.response) {
          // Nếu có phản hồi từ server và mã lỗi không phải là 404, hiển thị lỗi từ server
          if (error.response.status !== 404) {
            console.error("Server Error:", error.response.data);
            throw new Error(error.response.data.error);
          } else {
            // Nếu mã lỗi là 404 (Không tìm thấy thông báo), hiển thị thông báo lỗi từ server
            console.error("Announcement not found:", error.response.data);
            throw new Error("Announcement not found");
          }
        } else {
          // Nếu không có phản hồi từ server, hiển thị lỗi kết nối
          console.error("Connection Error:", error.message);
          throw new Error("Connection Error");
        }
      }
    };
    const getNewsDetails = async () => {
      try {
        const result = await axios.get(`${serverURL}/announcement/${slug}`);
        if (result.data.status === "error") {
          navigator("/notfound");
        } else {
          updateStatus();
          setContentHtml(result.data.announcement.Content);
        }
      } catch (error) {
        // navigator("/notfound");
      }
    };

    getNewsDetails();
  }, []);
  return (
    <>
      <DefaultLayout>
        <div
          className="content-container py-10 px-20"
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        ></div>
      </DefaultLayout>
    </>
  );
}
