import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { DropzoneArea } from "material-ui-dropzone";
import axios from "axios";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function MediaLibrary(props) {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [files, setFiles] = useState([]);
  const [mediaList, setMediaList] = useState([]);
  const [mediaId, setMediaId] = useState(0);
  const mediaStyles = {
    width: "20%",
    height: "200px",
    padding: "15px",
    overflow: "hidden",
    boxSizing: "border-box",
    display: "block",
  };
  const imgStyles = {
    maxWidth: "100%",
    width: "100%",
    height: "100%",
    objectFit: "cover",
    pointerEvents: "none",
    border: "2px solid transparent",
  };
  const selectedStyle = {
    maxWidth: "100%",
    width: "100%",
    height: "100%",
    objectFit: "cover",
    pointerEvents: "none",
    border: "2px solid green",
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleDropChange = (filess) => {
    setFiles(filess);
    console.log(filess);
    console.log(files);
  };
  const dropDelete = () => {
    setFiles([]);
  };
  const handleUpload = () => {
    console.log("uploaded");
  };
  const handleClick = (event, key) => {
    //event.stopPropagation();
    event.preventDefault();
    //event.nativeEvent.stopImmediatePropagation();
    setMediaId(key);
    alert(mediaId);
    // eslint-disable-next-line react/prop-types
    props.sendDataToParent(event.target.dataset.id, event.target.href);
    //sendDataToParent(event.target.mediaId);
  };

  useEffect(() => {
    getAllMedia();
    console.log(mediaList);
  }, []);
  const getAllMedia = async () => {
    const response = await axios.get("/media");
    setMediaList(response.data);
  };
  return (
    <div className={classes.root}>
      <Paper>
        <Tabs
          value={value}
          indicatorColor="primary"
          textColor="primary"
          onChange={handleChange}
          aria-label="simple tabs example"
        >
          <Tab label="Media Library" {...a11yProps(0)} />
          <Tab label="Upload New" {...a11yProps(1)} />
        </Tabs>
      </Paper>
      <TabPanel value={value} index={0}>
        <div
          className="mediaWrapper"
          style={{ display: "flex", flexWrap: "wrap" }}
        >
          {mediaList.map((media, key) => (
            <a
              href={media.path}
              className="mediaItem"
              key={key}
              style={mediaStyles}
              data-id={media.id}
              onClick={(e) => {
                handleClick(e, key);
              }}
            >
              {media.type === "thumbnail" ? (
                <img
                  src={media.path}
                  style={key === mediaId ? selectedStyle : imgStyles}
                />
              ) : (
                <video style={imgStyles}>
                  <source src={media.path} type="video/mp4"></source>
                </video>
              )}
            </a>
          ))}
        </div>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <DropzoneArea
          onChange={handleDropChange}
          onDelete={dropDelete}
          showPreviews={true}
          showPreviewsInDropzone={false}
        />
        <div
          style={{
            textAlign: "right",
            position: "absolute",
            width: "100%",
            bottom: 0,
            left: 0,
            padding: "20px",
            boxSizing: "border-box",
          }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={handleUpload}
            disabled={files.length < 1 ? true : false}
          >
            Upload
          </Button>
        </div>
      </TabPanel>
    </div>
  );
}
