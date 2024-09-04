import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Quill from "quill";

// Registering the 'script' format to include superscript and subscript
const Script = Quill.import("formats/script");
Quill.register(Script, true);

function TextFormatter({ pad, setValue }) {
  return (
    <ReactQuill
      className={`bg-white ${pad}`}
      theme="snow"
      onChange={setValue}
      modules={{
        toolbar: [
          ["bold", "italic", "underline"],
          [{ script: "super" }, { script: "sub" }],
        ],
      }}
    />
  );
}

export default TextFormatter;
