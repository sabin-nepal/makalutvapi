import React from "react";
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
//import InputAdornment from "@material-ui/core/InputAdornment";
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
//import People from "@material-ui/icons/People";
//core components
import CustomInput from "components/CustomInput/CustomInput.js";
//import Input from "@material-ui/core/Input";
//import Chip from "@material-ui/core/Chip";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import MUIRichTextEditor from "mui-rte";
import MediaLibrary from "../../components/MediaLibrary/MediaLibrary.js";
import { convertFromHTML, ContentState, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import Alert from "@material-ui/lab/Alert";

const defaultTheme = createMuiTheme();

Object.assign(defaultTheme, {
  overrides: {
    MUIRichTextEditor: {
      root: {
        marginTop: 20,
        width: "100%",
        minHeight: "400px",
      },
      editor: {
        borderBottom: "1px solid gray",
      },
    },
  },
});

//import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    width: "100%",
  },
  chips: {
    display: "flex",
    flexWrap: "wrap",
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
}));

//const useStyles2 = makeStyles(styles);

// const ITEM_HEIGHT = 48;
// const ITEM_PADDING_TOP = 8;
// const MenuProps = {
//   PaperProps: {
//     style: {
//       maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
//       width: 250,
//     },
//   },
// };

// function getStyles(name, category, theme) {
//   return {
//     fontWeight:
//       category.indexOf(name["id"]) === -1
//         ? theme.typography.fontWeightRegular
//         : theme.typography.fontWeightMedium,
//   };
// }

export default function FormNews(props) {
  const classes = useStyles();
  const data = props;
  const news = data.location.state;
  //const [category, setCategory] = React.useState([]);
  const [categoryId, setCategoryIdList] = React.useState([]);
  const [categories, setCategoriesList] = React.useState([]);
  const [title, setTitle] = React.useState("");
  //const [checked, setCheck] = React.useState(false);
  const [pollTitle, setPollTitle] = React.useState("");
  const [content, setContent] = React.useState("");
  const [richText, setRichText] = React.useState("");
  const [excerpt, setExcerpt] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [poll, setPoll] = React.useState(false);
  const [status, setStatus] = React.useState("active");
  const [error, setError] = React.useState(null);
  const [success, setMessage] = React.useState(null);
  const [btnLoading, setBtnLoading] = React.useState(0);
  const token = localStorage.getItem("token");
  const handleChange = (event) => {
    var catId = [...categoryId];
    console.log(catId, event.target.value);
    if (catId === "" || !catId.includes(event.target.value)) {
      catId.push(event.target.value);
    } else {
      var index = catId.indexOf(event.target.value);
      catId.splice(index, 1);
    }
    setCategoryIdList(catId);
  };
  const [imageId, setImageId] = React.useState("");
  const [featuredImage, setFeaturedImage] = React.useState("");
  React.useEffect(() => {
    if (news !== undefined) {
      setTitle(news.title);
      const contentHTML = convertFromHTML(news.content);
      const state = ContentState.createFromBlockArray(
        contentHTML.contentBlocks,
        contentHTML.entityMap
      );
      const content = JSON.stringify(convertToRaw(state));
      setContent(content);
      setExcerpt(news.excerpt);
      if (news.type === "poll") {
        setPoll(true);
        setPollTitle(news.pollTitle);
      }
      setImageId(news.media[0].id);
      setStatus(news.status);
      setFeaturedImage(news.media[0]["path"]);
      var catId = [];
      news.categories.map((cat) => {
        catId.push(cat.id);
      });
      setCategoryIdList(catId);
      //setCategory(catList);
    }
    getAllCategories();
    // eslint-disable-next-line react/prop-types
  }, [props.location.state]);
  const getAllCategories = async () => {
    const response = await axios.get("/category/all/-1");
    var setCat = [];
    console.log(categoryId);
    response.data.map((cat) => {
      setCat.push({
        id: cat.id,
        title: cat.title,
        isChecked: categoryId.includes(cat.id),
      });
      console.log(categoryId.includes(cat.id));
    });
    setCategoriesList(setCat);
  };
  const handleUpdate = async (event) => {
    console.log(event);
    var newsType = "news";
    if (!poll) setPollTitle("");
    else newsType = "poll";
    setError(null);
    setMessage(null);
    setBtnLoading(1);
    if (title === "" || richText === "" || imageId === "") {
      setBtnLoading(0);
      setError("All FIeld required");
      return;
    }
    var apiData = new URLSearchParams();
    categoryId.map((catt) => {
      apiData.append("category", catt);
    });
    const apiUrl = news === undefined ? "create" : "edit/" + news.id;
    apiData += `&title=${title}&content=${richText}&excerpt=${excerpt}
    &status=${status}&media=${imageId}
    &pollTitle=${pollTitle}&type=${newsType}`;
    const config = {
      method: "post",
      url: "/news/" + apiUrl,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: "Bearer " + token,
      },
      data: apiData,
    };
    try {
      const response = await axios(config);
      setMessage(response.data.msg);
      setBtnLoading(0);
    } catch (error) {
      setError("Unable to Update News");
      setBtnLoading(0);
      console.log(error);
    }
  };
  const sendDataToParent = (id, img) => {
    // the callback. Use a better name
    //alert(index);
    if (!checkURL(img)) {
      setError("Only Support jpg/png format");
    } else {
      setImageId(id);
      setFeaturedImage(img);
      setError(null);
    }
    setOpen(false);
  };
  const checkURL = (url) => {
    return url.match(/\.(jpeg|jpg|png)$/) != null;
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const handleChangeStatus = (event) => {
    setStatus(event.target.value);
  };

  const handleChangePoll = (event) => {
    setPoll(event.target.value);
  };
  const getContent = (event) => {
    setRichText(draftToHtml(convertToRaw(event.getCurrentContent())));
  };
  return (
    <Card>
      <CardHeader color="info">
        <h4 className={classes.cardTitleWhite}>
          {news !== undefined ? "Edit" : "Add"} News
        </h4>
      </CardHeader>
      <CardBody>
        <Grid container>
          <GridItem xs={12} sm={12} md={8}>
            {error !== null ? <Alert severity="error">{error}</Alert> : ""}
            {success !== null ? (
              <Alert severity="success">{success}</Alert>
            ) : (
              ""
            )}
            <CustomInput
              labelText="News Title"
              id="float"
              inputProps={{
                value: title,
              }}
              formControlProps={{
                fullWidth: true,
                onChange: (event) => setTitle(event.target.value),
              }}
            />
            <MuiThemeProvider theme={defaultTheme}>
              <MUIRichTextEditor
                value={content}
                onChange={getContent}
                label="Type something here..."
              />
            </MuiThemeProvider>
            <TextField
              placeholder="Short Description"
              multiline
              rows={2}
              id="excerpt"
              value={excerpt}
              onChange={(event) => setExcerpt(event.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              disabled={btnLoading}
              onClick={(event) => {
                handleUpdate(event);
              }}
            >
              {btnLoading
                ? "Loading..."
                : news === undefined
                ? "Add"
                : "Update"}
            </Button>
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            {categories.map(
              (name) => (
                console.log(name.isChecked),
                (
                  <FormControlLabel
                    key={name["id"]}
                    control={
                      <Checkbox
                        id={name["id"]}
                        checked={categoryId.includes(name["id"])}
                        value={name["id"]}
                        onChange={handleChange}
                      />
                    }
                    label={name["title"]}
                  />
                )
              )
            )}

            <FormControl className={classes.formControl}>
              <InputLabel id="demo-mutiple-chip-label">Category</InputLabel>
              {/* <Select
                labelId="demo-mutiple-chip-label"
                id="demo-mutiple-chip"
                multiple
                value={category}
                onChange={handleChange}
                input={<Input id="select-multiple-chip" />}
                renderValue={(selected) => (
                  <div className={classes.chips}>
                    {selected.map((value) => (
                      <Chip
                        key={value["id"]}
                        label={value["title"]}
                        className={classes.chip}
                      />
                    ))}
                  </div>
                )}
                MenuProps={MenuProps}
              >
                {categories.map((name) => (
                  
                  // <MenuItem
                  //   key={name["id"]}
                  //   value={name}
                  //   style={getStyles(name, categories, theme)}
                  // >
                  //   {name["title"]}
                  // </MenuItem>
                ))}
              </Select> */}
            </FormControl>
            {featuredImage !== "" ? (
              <img src={featuredImage} style={{ maxWidth: "100%" }} />
            ) : (
              ""
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={handleOpen}
            >
              {featuredImage === "" ? "Add" : "Edit"} Image
            </Button>
            <MediaLibrary open={open} sendDataToParent={sendDataToParent} />
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
            <FormControl variant="filled" className={classes.formControl}>
              <InputLabel id="demo-simple-select-filled-label">Poll</InputLabel>
              <Select
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                value={poll}
                onChange={handleChangePoll}
              >
                <MenuItem value={false}>No</MenuItem>
                <MenuItem value={true}>Yes</MenuItem>
              </Select>
            </FormControl>
            {poll && (
              <CustomInput
                labelText="Poll Title"
                id="poll-title"
                inputProps={{
                  value: pollTitle,
                }}
                formControlProps={{
                  fullWidth: true,
                  onChange: (event) => setPollTitle(event.target.value),
                }}
              />
            )}
          </GridItem>
        </Grid>
      </CardBody>
    </Card>
  );
}
