import React, { useEffect } from "react";
import { motion } from "framer-motion";
import useStorage from "../../hooks/useStorage";
import colors from "../../constants/colors";

const ProgressBar = ({ file, setFile, setFileUrl, images, count }) => {
  const { progress, url } = useStorage(file);

  useEffect(() => {
    if (url) {
      if (images && count) {
        setFile(null);
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
    <motion.div
      style={{
        height: "5px",
        marginTop: "20px",
        backgroundColor: colors.mainOrange,
        maxWidth: "100%",
      }}
      initial={{ width: 0 }}
      animate={{ width: progress + "%" }}
    ></motion.div>
  );
};

export default ProgressBar;
