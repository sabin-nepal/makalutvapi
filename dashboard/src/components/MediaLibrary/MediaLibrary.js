import React, { useEffect, useState } from "react";
import axios from "axios";

export default function MediaLibrary() {
  const [mediaList, setMediaList] = useState([]);
  const [mediaSelected, setMediaSelected] = useState("2px solid red");
  const mediaStyles = {
    width: "20%",
    height: "200px",
    padding: "15px",
    overflow: "hidden",
    boxSizing: "border-box",
  };
  const imgStyles = {
    maxWidth: "100%",
    width: "100%",
    height: "100%",
    objectFit: "cover",
    border: mediaSelected,
  };
  const handleClick = (event) => {
    //event.stopPropagation();
    event.preventDefault();
    //event.nativeEvent.stopImmediatePropagation();
    setMediaSelected("2px solid green");
    console.log(event.target.mediaid);
    //sendDataToParent(event.target.mediaId);
  };

  useEffect(() => {
    getAllMedia();
    console.log(mediaList);
  }, []);
  const getAllMedia = async () => {
    const response = await axios.get("/media");
    console.log(response.data);
    setMediaList(response.data);
  };
  return (
    <div className="mediaWrapper" style={{ display: "flex", flexWrap: "wrap" }}>
      {mediaList.map((media, key) => (
        <a
          href={media.path}
          className="mediaItem"
          key={key}
          style={mediaStyles}
          mediaId={media.id}
          onClick={handleClick}
        >
          {media.type === "thumbnail" ? (
            <img src={media.path} style={imgStyles} />
          ) : (
            <video style={imgStyles}>
              <source src={media.path} type="video/mp4"></source>
            </video>
          )}
        </a>
      ))}
    </div>
  );
}
