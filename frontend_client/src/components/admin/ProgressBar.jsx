import React, { useEffect } from "react";
import { motion } from "framer-motion";
import useStorage from "../../hooks/useStorage";
import colors from "../../constants/colors";

const ProgressBar = ({ file, setFile, setFileUrl, images, count }) => {
  const { progress, url } = useStorage(file);

  useEffect(() => {
    if (url) {
      if (images && count) {
        setFile((prevFiles) => {
          const name = "file_" + count;
          const newFiles = { ...prevFiles };
          newFiles[name] = null;

          return newFiles;
        });
        setFileUrl((prevState) => {
          const name = "image_" + count;
          const newState = { ...prevState };
          newState[name] = url;

          return newState;
        });
      } else {
        setFile(null);
        setFileUrl(url);
      }
    }
  }, [url, setFile, setFileUrl, images, count]);

  return (
    <div
      style={{
        border: "1px solid",
        borderColor: colors.mainOrange,
        borderRadius: "10px",
        height: "8px",
        marginTop: "20px",
        maxWidth: "92%",
      }}
    >
      <motion.div
        style={{
          height: "8px",
          backgroundColor: colors.mainOrange,
          maxWidth: "100%",
          border: "1px solid",
          borderColor: colors.mainOrange,
          borderRadius: "10px",
        }}
        initial={{ width: 0 }}
        animate={{ width: progress + "%" }}
      ></motion.div>
    </div>
  );
};

export default ProgressBar;
