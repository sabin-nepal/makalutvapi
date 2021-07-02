import React, { useEffect, useState } from "react";
import axios from "axios";

const MakaluMediaWrapperr = () => {
  const [mediaList, setMediaList] = useState([]);
  useEffect(() => {
    getAllMedia();
    console.log(mediaList);
  }, []);
  const getAllMedia = async () => {
    const response = await axios.get("/media");
    setMediaList(response.data);
  };
  return <div>Hello World</div>;
};

export default MakaluMediaWrapperr;
