import React, { useState, useEffect } from "react";
import axios from "axios";
// react plugin for creating charts
// import ChartistGraph from "react-chartist";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
//import Icon from "@material-ui/core/Icon";
// @material-ui/icons
//import Store from "@material-ui/icons/Store";
// import Warning from "@material-ui/icons/Warning";
// import DateRange from "@material-ui/icons/DateRange";
// import LocalOffer from "@material-ui/icons/LocalOffer";
// import Update from "@material-ui/icons/Update";
// import ArrowUpward from "@material-ui/icons/ArrowUpward";
// import AccessTime from "@material-ui/icons/AccessTime";
//import Accessibility from "@material-ui/icons/Accessibility";
// import BugReport from "@material-ui/icons/BugReport";
// import Code from "@material-ui/icons/Code";
// import Cloud from "@material-ui/icons/Cloud";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Button from "components/CustomButtons/Button.js";
// import Tasks from "components/Tasks/Tasks.js";
// import CustomTabs from "components/CustomTabs/CustomTabs.js";
// import Danger from "components/Typography/Danger.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import DeleteIcon from "@material-ui/icons/DeleteOutlined";
import EditIcon from "@material-ui/icons/EditOutlined";
import Alert from "@material-ui/lab/Alert";
// import CardFooter from "components/Card/CardFooter.js";

// import { bugs, website, server } from "variables/general.js";

// import {
//   dailySalesChart,
//   emailsSubscriptionChart,
//   completedTasksChart,
// } from "variables/charts.js";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles(styles);

export default function Category() {
  const classes = useStyles();
  const history = useHistory();
  let _tableData = [];
  const [categories, setCategories] = useState([]);
  const [message, setMessage] = useState(null);
  const token = localStorage.getItem("token");
  const deleteData = async (value) => {
    console.log(value);
    const config = {
      method: "delete",
      url: "/category/" + value,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: "Bearer " + token,
      },
    };
    try {
      const data = await axios(config);
      setMessage(data.data.msg);
    } catch (error) {
      console.log(error);
    }
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };
  const editData = async (value) => {
    history.push({
      pathname: "/admin/form/category",
      state: value,
    });
  };
  function handleClick(value) {
    history.push(value);
  }
  useEffect(() => {
    getAllCategory();
  }, []);
  const getAllCategory = async () => {
    const response = await axios.get("/category/all/-1");
    let data;
    response.data.map((category, key) => {
      var index = key + 1;
      data = [
        "" + index,
        category.title,
        <Button onClick={() => editData(category)} key={key}>
          <EditIcon></EditIcon>
        </Button>,
        <Button onClick={() => deleteData(category.id)} key={key}>
          <DeleteIcon></DeleteIcon>
        </Button>,
      ];
      _tableData.push(data);
    });
    setCategories(_tableData);
  };

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={4}>
          {message !== null ? <Alert severity="success">{message}</Alert> : ""}
          <Button
            fullWidth
            color="primary"
            onClick={() => handleClick("/admin/form/category")}
          >
            Add Category
          </Button>
        </GridItem>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="success">
              <h4 className={classes.cardTitleWhite}>Category</h4>
            </CardHeader>
            <CardBody>
              <Table
                tableHeaderColor="warning"
                tableHead={["ID", "Name", "Edit", "Delete"]}
                tableData={categories}
              />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
