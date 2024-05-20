import { useState } from "react";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

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

  return (
    <div className="h-full w-full p-4 relative">
      <ReactQuill
        theme="snow"
        value={editorData}
        onChange={setEditorData}
        modules={Modules}
      />
    </div>
  );
}

export default TextEditor;
