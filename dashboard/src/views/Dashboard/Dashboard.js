import React from "react";
// react plugin for creating charts
// import ChartistGraph from "react-chartist";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Store from "@material-ui/icons/Store";
// import Warning from "@material-ui/icons/Warning";
// import DateRange from "@material-ui/icons/DateRange";
// import LocalOffer from "@material-ui/icons/LocalOffer";
// import Update from "@material-ui/icons/Update";
// import ArrowUpward from "@material-ui/icons/ArrowUpward";
// import AccessTime from "@material-ui/icons/AccessTime";
import Accessibility from "@material-ui/icons/Accessibility";
// import BugReport from "@material-ui/icons/BugReport";
// import Code from "@material-ui/icons/Code";
// import Cloud from "@material-ui/icons/Cloud";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
// import Tasks from "components/Tasks/Tasks.js";
// import CustomTabs from "components/CustomTabs/CustomTabs.js";
// import Danger from "components/Typography/Danger.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
// import CardFooter from "components/Card/CardFooter.js";

// import { bugs, website, server } from "variables/general.js";

// import {
//   dailySalesChart,
//   emailsSubscriptionChart,
//   completedTasksChart,
// } from "variables/charts.js";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import axios from "axios";

const useStyles = makeStyles(styles);

export default function Dashboard() {
  const classes = useStyles();
  const token = localStorage.getItem("token");
  let _tableData = [];
  const [newsCount, setNewsCount] = React.useState("");
  const [news, setNews] = React.useState([]);
  const [pollCount, setPollCount] = React.useState("");
  //const [insightCount, setInsightCount] = React.useState("");
  const [videoCount, setVideoCount] = React.useState("");
  const [advCount, setAdvCount] = React.useState("");
  React.useEffect(() => {
    getNews();
    countPoll();
    countAdv();
    //countInsight();
    countVideo();
  }, []);

  const configUrl = (url) => {
    const config = {
      method: "get",
      url: url,
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    return config;
  };

  const getNews = async () => {
    const response = await axios(configUrl("/news/all?type=news"));
    setNewsCount(response.data.count);
    let data;
    response.data.rows.map((getNews, key) => {
      var index = key + 1;
      data = ["" + index, getNews.title, getNews.categories[0].title];
      _tableData.push(data);
    });
    setNews(_tableData);
  };
  const countPoll = async () => {
    const response = await axios(
      configUrl("/news/all?type=poll&size=0&status=active")
    );
    setPollCount(response.data.count);
  };
  const countAdv = async () => {
    const response = await axios(configUrl("/adv/all?size=0&status=active"));
    setAdvCount(response.data.count);
  };
  // const countInsight = async () => {
  //   const response = await axios(
  //     configUrl("/insight/all?size=0&status=active")
  //   );
  //   setInsightCount(response.data.count);
  // };
  const countVideo = async () => {
    const response = await axios(configUrl("/video/all?size=0&status=active"));
    setVideoCount(response.data.count);
  };

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="warning" stats icon>
              <CardIcon color="warning">
                <Icon>content_copy</Icon>
              </CardIcon>
              <p className={classes.cardCategory}>Published Posts</p>
              <h3 className={classes.cardTitle}>
                <span>{newsCount}</span>
              </h3>
            </CardHeader>
            {/* <CardFooter stats>
              <div className={classes.stats}>
                <Danger>
                  <Warning />
                </Danger>
                <a href="#pablo" onClick={(e) => e.preventDefault()}>
                  Get more space
                </a>
              </div>
            </CardFooter> */}
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="success" stats icon>
              <CardIcon color="success">
                <Store />
              </CardIcon>
              <p className={classes.cardCategory}>Published Ads</p>
              <h3 className={classes.cardTitle}>{advCount}</h3>
            </CardHeader>
            {/* <CardFooter stats>
              <div className={classes.stats}>
                <DateRange />
                Last 24 Hours
              </div>
            </CardFooter> */}
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="danger" stats icon>
              <CardIcon color="danger">
                <Icon>info_outline</Icon>
              </CardIcon>
              <p className={classes.cardCategory}>published Videos</p>
              <h3 className={classes.cardTitle}>{videoCount}</h3>
            </CardHeader>
            {/* <CardFooter stats>
              <div className={classes.stats}>
                <LocalOffer />
                Tracked from Github
              </div>
            </CardFooter> */}
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="info" stats icon>
              <CardIcon color="info">
                <Accessibility />
              </CardIcon>
              <p className={classes.cardCategory}>Polls</p>
              <h3 className={classes.cardTitle}>{pollCount}</h3>
            </CardHeader>
            {/* <CardFooter stats>
              <div className={classes.stats}>
                <Update />
                Just Updated
              </div>
            </CardFooter> */}
          </Card>
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
                tableHead={["ID", "Title", "Category"]}
                tableData={news}
              />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
