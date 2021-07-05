import React, { useState, useEffect } from "react";
import axios from "axios";
import Grid from "@material-ui/core/Grid";
//import InputAdornment from "@material-ui/core/InputAdornment";
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
//import People from "@material-ui/icons/People";
//core components
import MediaLibrary from "../../components/MediaLibrary/MediaLibrary.js";
import Button from "@material-ui/core/Button";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Alert from "@material-ui/lab/Alert";
import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

const useStyles = makeStyles(styles);

export default function FormInsights(props) {
  const classes = useStyles();
  const data = props;
  const insight = data.location.state;
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const [success, setMessage] = useState(null);
  const [open, setOpen] = useState(false);
  const [imageId, setImageId] = useState([]);
  const [btnLoading, setBtnLoading] = useState(0);
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (insight !== undefined) {
      setImages();
      setImageId();
    }
  }, []);
  const handleUpdate = async (event) => {
    console.log(event);
    setError(null);
    setMessage(null);
    setBtnLoading(1);
    if (imageId === "") {
      setBtnLoading(0);
      setError("All Fields required");
      return;
    }
    const apiUrl = insight === undefined ? "create" : "edit/" + insight.id;
    var apiData = new URLSearchParams();
    const config = {
      method: "post",
      url: "/insight/" + apiUrl,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: "Bearer " + token,
      },
      data: apiData,
    };
    try {
      const { data } = await axios(config);
      setMessage(data.msg);
      setBtnLoading(0);
    } catch (error) {
      setError("Unable to Update Insight");
      setBtnLoading(0);
      console.log(error);
    }
  };
  const sendDataToParent = (id, img) => {
    console.log(id);
    console.log(img);
    if (!checkURL(img)) {
      setError("Only Support images");
    } else {
      setImageId(id);
      setImages(img);
      setError(null);
    }
    setOpen(false);
    console.log(imageId);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const checkURL = (url) => {
    url.map((image) => {
      return image.match(/\.(jpeg|jpg|png|gif)$/) != null ? true : false;
    });
  };

  return (
    <Card>
      <CardHeader color="info">
        <h4 className={classes.cardTitleWhite}>
          {insight === undefined ? "Add" : "Update"} Insight
        </h4>
      </CardHeader>
      <CardBody>
        <Grid container justify="center">
          <GridItem xs={12} sm={12} md={12}>
            {error !== null ? <Alert severity="error">{error}</Alert> : ""}
            {success !== null ? (
              <Alert severity="success">{success}</Alert>
            ) : (
              ""
            )}
            {images.map((image) => {
              <img src={image} height="150" width="150" />;
            })}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={handleOpen}
            >
              Add Images
            </Button>
            <MediaLibrary
              isMultiple={true}
              open={open}
              sendDataToParent={sendDataToParent}
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
                : insight === undefined
                ? "Add"
                : "Update"}
            </Button>
          </GridItem>
        </Grid>
      </CardBody>
    </Card>
  );
}
