import React, { useEffect, useState } from "react";
import { ReactMediaLibrary } from "react-media-library";
import Card from "components/Card/Card.js";
//import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";

const MakaluMediaWrapper = () => {
  const [display, setDisplay] = useState(false);
  const [fileLibraryList, setFileLibraryList] = useState("");

  useEffect(() => {
    setFileLibraryList([
      {
        _id: 1,
        title: "Me and my dog",
        size: 294880,
        fileName: "img_3549.jpg",
        type: "image/jpeg",
        createdAt: new Date("2019-10-17T03:12:29.866Z"),
        thumbnailUrl:
          "https://lae.prolificdevs.net/public/uploads/thumbnails/1622709617609-minirals-water.jpg",
      },
      {
        _id: 2,
        title: "2019 Summer Vacation",
        size: 864483,
        fileName: "201702.jpg",
        type: "image/jpeg",
        createdAt: new Date("2019-10-17T03:12:45.018Z"),
        thumbnailUrl:
          "https://lae.prolificdevs.net/public/uploads/thumbnails/1622709617609-minirals-water.jpg",
      },
      {
        _id: 3,
        title: "Our new baby",
        size: 586458,
        fileName: "271092.jpg",
        type: "image/jpeg",
        createdAt: new Date("2019-10-17T03:19:33.498Z"),
        thumbnailUrl:
          "https://lae.prolificdevs.net/public/uploads/thumbnails/1622709617609-minirals-water.jpg",
      },
      {
        _id: 4,
        title: "My new car",
        size: 894665,
        fileName: "photo-107.jpg",
        type: "image/jpeg",
        createdAt: new Date("2019-10-17T03:28:39.723Z"),
        thumbnailUrl:
          "https://lae.prolificdevs.net/public/uploads/thumbnails/1622709617609-minirals-water.jpg",
      },
    ]);
  }, []);

  async function uploadCallback(fileBase64, fileMeta) {
    console.log(fileBase64);
    console.log(fileMeta);
  }

  function selectCallback(item) {
    // Hide modal
    setDisplay(false);
    console.log(item);
  }

  async function deleteCallback(item) {
    console.log(item);
  }

  return (
    <Card>
      <CardBody>
        <button onClick={() => setDisplay(true)}>
          Open React Media Library
        </button>
        <ReactMediaLibrary
          show={display}
          onHide={() => setDisplay(false)}
          fileUploadCallback={uploadCallback}
          fileLibraryList={fileLibraryList}
          fileSelectCallback={selectCallback}
          fileDeleteCallback={deleteCallback}
        />
      </CardBody>
    </Card>
  );
};

export default MakaluMediaWrapper;
