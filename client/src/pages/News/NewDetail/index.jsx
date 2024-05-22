import { useNavigate, useParams } from "react-router";
import Header from "../../../layouts/DefaultLayout/Header";
import Footer from "../../../layouts/DefaultLayout/Footer";
import { useEffect, useState } from "react";
import { getIdFromSlug } from "../../../utils";
import axios from "axios";
import { serverURL } from "../../../utils/server";

export default function NewsDetail() {
  const { slug } = useParams();
  const navigator = useNavigate();
  const [contentHtml, setContentHtml] = useState("");
  useEffect(() => {
    const getNewsDetails = async () => {
      try {
        const id = getIdFromSlug(slug);
        const result = await axios.get(`${serverURL}/news/${id}`);
        if (result.data.status === "error") {
          navigator("/notfound");
        } else {
          console.log(result.data.news);
          setContentHtml(result.data.news.Content);
        }
      } catch (error) {
        // navigator("/notfound");
      }
    };
    getNewsDetails();
  }, []);
  return (
    <>
      <Header />
      <div
        className="content-container py-10 px-20 min-h-screen"
        dangerouslySetInnerHTML={{ __html: contentHtml }}
      ></div>
      <Footer />
    </>
  );
}
