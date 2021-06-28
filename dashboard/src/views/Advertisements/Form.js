import React, { useState, useEffect } from "react";
import axios from "axios";
import Grid from "@material-ui/core/Grid";
//import InputAdornment from "@material-ui/core/InputAdornment";
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
//import People from "@material-ui/icons/People";
//core components
import CustomInput from "components/CustomInput/CustomInput.js";
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

export default function FormAdv(props) {
  const classes = useStyles();
  const data = props;
  console.log(data);
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("active");
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");
  const [error, setError] = useState(null);
  const [success, setMessage] = useState(null);
  const [btnLoading, setBtnLoading] = useState(0);
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (data.location.state !== undefined) {
      var adv = data.location.state;
      setTitle(adv.title);
      setImage(adv.medium["path"]);
      setUrl(adv.url);
      setStatus(adv.status);
    }
  }, []);
  console.log(url);
  const handleChangeStatus = (event) => {
    setStatus(event.target.value);
  };
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
    const data = `title=${title}`;
    const config = {
      method: "post",
      url: "/category/create",
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
      setError("Unable to Create Category");
      setBtnLoading(0);
      console.log(error);
    }
  };
  return (
    <Card>
      <CardHeader color="info">
        <h4 className={classes.cardTitleWhite}>
          {data.location.state !== undefined ? "Update" : "Add"} Category
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
                : data.location.state !== undefined
                ? "Update"
                : "Add"}
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
            <h5>Choose Image</h5>
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
