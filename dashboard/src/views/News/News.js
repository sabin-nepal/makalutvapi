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

export default function News() {
  const classes = useStyles();
  const history = useHistory();
  let _tableData = [];
  const [news, setNews] = useState([]);
  function handleClick() {
    history.push("/admin/add-news");
  }
  useEffect(() => {
    getAllNews();
  }, []);
  const getAllNews = async () => {
    const response = await axios.get("/news");
    let data;
    response.data.map((getNews, key) => {
      var index = key + 1;
      var category =
        getNews.categories[0] !== undefined ? getNews.categories[0].title : "";
      data = ["" + index, getNews.title, category, "Edit", "delete"];
      _tableData.push(data);
    });
    setNews(_tableData);
  };
  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={4}>
          <Button fullWidth color="primary" onClick={() => handleClick()}>
            Add News
          </Button>
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="success">
              <h4 className={classes.cardTitleWhite}>Recent Posts</h4>
            </CardHeader>
            <CardBody>
              <Table
                tableHeaderColor="warning"
                tableHead={["ID", "Name", "Category", "Edit", "Delete"]}
                tableData={news}
              />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
