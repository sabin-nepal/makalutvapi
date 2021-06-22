import React, { useState } from "react";
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

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

const useStyles = makeStyles(styles);

export default function AddCategories() {
  const classes = useStyles();
  const [title, setTitle] = useState("");
  const token = localStorage.getItem("token");
  const handleCreate = async (event) => {
    console.log(event);
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
      console.log(data);
    } catch (error) {
      console.log(error);
      //const { data } = error.response;
    }
  };
  return (
    <Card>
      <CardHeader color="info">
        <h4 className={classes.cardTitleWhite}>Add Category</h4>
      </CardHeader>
      <CardBody>
        <Grid container justify="center">
          <GridItem xs={12} sm={12} md={8}>
            <CustomInput
              labelText="Title"
              id="float"
              formControlProps={{
                fullWidth: true,
                onChange: (event) => setTitle(event.target.value),
              }}
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={8}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              onClick={(event) => {
                handleCreate(event);
              }}
              className={classes.submit}
            >
              Add Category
            </Button>
          </GridItem>
        </Grid>
      </CardBody>
    </Card>
  );
}
