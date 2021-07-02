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
import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

const useStyles = makeStyles(styles);

export default function FormCategories(props) {
  const classes = useStyles();
  const data = props;
  const category = data.location.state;
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [error, setError] = useState(null);
  const [success, setMessage] = useState(null);
  const [open, setOpen] = useState(false);
  const [imageId, setImageId] = useState("");
  const [btnLoading, setBtnLoading] = useState(0);
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (category !== undefined) {
      setTitle(category.title);
      setImage(category.medium["path"]);
    }
  }, []);
  const handleUpdate = async (event) => {
    console.log(event);
    setError(null);
    setMessage(null);
    setBtnLoading(1);
    if (title === "") {
      setBtnLoading(0);
      setError("Title required");
      return;
    }
    const apiUrl = category === undefined ? "create" : "edit/" + category.id;
    const data = `title=${title}&media=${imageId}`;
    const config = {
      method: "post",
      url: "/category/" + apiUrl,
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
      setError("Unable to Update Category");
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
  const handleOpen = () => {
    setOpen(true);
  };

  const checkURL = (url) => {
    return url.match(/\.(jpeg|jpg|png)$/) != null;
  };

  return (
    <Card>
      <CardHeader color="info">
        <h4 className={classes.cardTitleWhite}>
          {category === undefined ? "Add" : "Update"}Category
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
                : category === undefined
                ? "Add"
                : "Update"}
            </Button>
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={handleOpen}
            >
              {image === "" ? "Add" : "Edit"} Image
            </Button>

            <MediaLibrary open={open} sendDataToParent={sendDataToParent} />

            {image !== "" ? (
              <img src={image} alt={title} height="150" width="150" />
            ) : (
              ""
            )}
          </GridItem>
        </Grid>
      </CardBody>
    </Card>
  );
}
