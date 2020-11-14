import { ClassicEditor } from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import React, { useState } from "react";
import parse from "html-react-parser";

const AdminCKEditor = () => {
  const [dataEditor, setdataEditor] = useState("");
  return (
    <div>
      <CKEditor
        editor={ClassicEditor}
        data={dataEditor}
        onChange={(_, editor) => {
          const data = editor.getData();
          setdataEditor(data);
        }}
      />

      <div>
        <h1>content</h1>
        {parse(dataEditor)}
      </div>
    </div>
  );
};

export default AdminCKEditor;
