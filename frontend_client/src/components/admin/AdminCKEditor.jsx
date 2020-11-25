import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import React, { useState } from "react";
import { Divcenter } from "../styled/Containers";
import "./Editor.css";

const AdminCKEditor = ({ setData, dataEditor, placeholder }) => {
  const [errors] = useState();
  errors && console.log(errors);
  return (
    <Divcenter>
      <CKEditor
        editor={ClassicEditor}
        name="body"
        placeholder={placeholder}
        data={dataEditor}
        value={dataEditor}
        errors={errors}
        config={{
          toolbar: [
            "heading",
            "|",
            "bold",
            "italic",
            "link",
            "bulletedList",
            "numberedList",
            "blockQuote",
            "insertTable",
            "mediaEmbed",
            "undo",
            "|",
            "redo",
          ],
        }}
        onChange={(event, editor) => {
          const data = editor.getData();
          setData(data);
        }}
      ></CKEditor>
    </Divcenter>
  );
};

export default AdminCKEditor;
