import React, { useState, useEffect } from "react";
import axios from "axios";
import Grid from "@material-ui/core/Grid";
//import InputAdornment from "@material-ui/core/InputAdornment";
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
//import People from "@material-ui/icons/People";
//core components
import CustomInput from "components/CustomInput/CustomInput.js";
import MediaLibrary from "../../components/MediaLibrary/MediaLibrary.js";
import Button from "@material-ui/core/Button";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Alert from "@material-ui/lab/Alert";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

const useStyles = makeStyles(styles);

export default function FormVideos(props) {
  const classes = useStyles();
  const data = props;
  const video = data.location.state;
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [videos, setVideos] = useState("");
  const [error, setError] = useState(null);
  const [success, setMessage] = useState(null);
  const [open, setOpen] = useState(false);
  const [videoOpen, setVideoOpen] = useState(false);
  const [status, setStatus] = useState("active");
  const [imageId, setImageId] = useState("");
  const [videoId, setVideoId] = useState("");
  const [btnLoading, setBtnLoading] = useState(0);
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (video !== undefined) {
      setTitle(video.title);
      setImage(video.thumbnail["path"]);
      setVideos(video.media["path"]);
      setImageId(video.thumbnailId);
      setVideoId(video.videoId);
      setStatus(video.status);
    }
  }, []);
  const imgStyles = {
    maxWidth: "100%",
    width: "50%",
    height: "505",
    border: "2px solid transparent",
  };
  const handleChangeStatus = (event) => {
    setStatus(event.target.value);
  };
  const handleUpdate = async (event) => {
    console.log(event);
    setError(null);
    setMessage(null);
    setBtnLoading(1);
    if (title === "" || imageId === "" || videoId === "") {
      setBtnLoading(0);
      setError("All Fields required");
      return;
    }
    const apiUrl = video === undefined ? "create" : "edit/" + video.id;
    const data = `title=${title}&thumbnail=${imageId}&media=${videoId}&status=${status}`;
    const config = {
      method: "post",
      url: "/video/" + apiUrl,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: "Bearer " + token,
      },
      data: data,
    };
    try {
      const { data } = await axios(config);
      setMessage(data.msg);
      setBtnLoading(0);
    } catch (error) {
      setError("Unable to Update Video");
      setBtnLoading(0);
      console.log(error);
    }
  };
  const sendDataToParent = (id, img, modalStatus) => {
    if (!checkURL(img)) {
      setError("Only Support jpg/png format");
    } else {
      setImageId(id);
      setImage(img);
      setError(null);
    }
    setOpen(modalStatus);
  };
  const addVideo = (id, img, modalStatus) => {
    var isVideo = img.match(/\.(mp4)$/) != null;
    if (!isVideo) {
      setError("Only Support mp4 format");
    } else {
      setVideoId(id);
      setVideos(img);
      setError(null);
    }
    setVideoOpen(modalStatus);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const handleVideoOpen = () => {
    setVideoOpen(true);
  };

  const checkURL = (url) => {
    return url.match(/\.(jpeg|jpg|png)$/) != null;
  };

  return (
    <Card>
      <CardHeader color="info">
        <h4 className={classes.cardTitleWhite}>
          {video === undefined ? "Add" : "Update"} Video
        </h4>
      </CardHeader>
      <CardBody>
        <Grid container justify="center">
          <GridItem xs={12} sm={12} md={8}>
            {error !== null ? <Alert severity="error">{error}</Alert> : ""}
            {success !== null ? (
              <Alert severity="success">{success}</Alert>
            ) : (
              ""
            )}
            <CustomInput
              labelText="Title"
              id="float"
              inputProps={{
                value: title,
              }}
              formControlProps={{
                fullWidth: true,
                onChange: (event) => setTitle(event.target.value),
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              disabled={btnLoading}
              onClick={(event) => {
                handleUpdate(event);
              }}
              className={classes.submit}
            >
              {btnLoading
                ? "Loading..."
                : video === undefined
                ? "Add"
                : "Update"}
            </Button>
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <FormControl variant="filled" className={classes.formControl}>
              <InputLabel id="demo-simple-select-filled-label">
                Status
              </InputLabel>
              <Select
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                value={status}
                onChange={handleChangeStatus}
              >
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="inactive">Inactive</MenuItem>
              </Select>
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={handleOpen}
            >
              {image === "" ? "Add" : "Edit"} Thumbnail
            </Button>

            <MediaLibrary open={open} sendDataToParent={sendDataToParent} />

            {image !== "" ? (
              <img src={image} alt={title} height="150" width="150" />
            ) : (
              ""
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={handleVideoOpen}
            >
              {videos === "" ? "Add" : "Edit"} Video
            </Button>

            <MediaLibrary open={videoOpen} sendDataToParent={addVideo} />

            {videos !== "" ? (
              <video style={imgStyles}>
                <source src={videos} type="video/mp4"></source>
              </video>
            ) : (
              ""
            )}
          </GridItem>
        </Grid>
      </CardBody>
    </Card>
  );
}
