import { useEffect, useState } from "react";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { serverURL } from "../../utils/server";
import axios from "axios";

const Modules = {
  toolbar: [
    [{ headers: [1, 2, 3, 4, 5, 6, false] }],
    [{ font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "odered" },
      { list: "bullet" },
      { align: [] },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image", "video"],
  ],
};

function TextEditor() {
  const [editorData, setEditorData] = useState("");

  const handleUpload = async () => {
    const images = document.querySelectorAll(".ql-editor img");
    const formData = new FormData();
    formData.append("editorData", editorData);

    await Promise.all(
      Array.from(images).map(async (image) => {
        const src = image.getAttribute("src");
        if (src && src.startsWith("data:image")) {
          console.log(1);
          const blob = await fetch(src).then((res) => res.blob());
          formData.append("images", blob, "image.png");
        }
      })
    );
    console.log(formData.get("images"));
    try {
      const response = await axios.post(
        `${serverURL}/quill-upload-test`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error uploading images:", error);
    }
  };

  return (
    <div className="h-full w-full p-4 relative">
      <ReactQuill
        theme="snow"
        value={editorData}
        onChange={setEditorData}
        modules={Modules}
      />

      <button onClick={handleUpload}>Save Content</button>
    </div>
  );
}

export default TextEditor;
