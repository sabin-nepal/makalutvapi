import React from "react";
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
//import InputAdornment from "@material-ui/core/InputAdornment";
import { makeStyles, useTheme } from "@material-ui/core/styles";
// @material-ui/icons
//import People from "@material-ui/icons/People";
//core components
import CustomInput from "components/CustomInput/CustomInput.js";
import Input from "@material-ui/core/Input";
import Chip from "@material-ui/core/Chip";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import MUIRichTextEditor from "mui-rte";
import Modal from "@material-ui/core/Modal";
import MediaLibrary from "../../components/MediaLibrary/MediaLibrary.js";
import { convertFromHTML, ContentState, convertToRaw } from "draft-js";
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
  paper: {
    position: "absolute",
    width: "85%",
    height: "80vh",
    overflow: "auto",
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
  },
}));

//const useStyles2 = makeStyles(styles);

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, category, theme) {
  return {
    fontWeight:
      category.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function FormNews(props) {
  const theme = useTheme();
  const classes = useStyles();
  const data = props;
  const news = data.location.state;
  const [category, setCategory] = React.useState([]);
  const [categories, setCategoriesList] = React.useState([]);
  const [title, setTitle] = React.useState("");
  const [pollTitle, setPollTitle] = React.useState("");
  const [content, setContent] = React.useState("");
  const [excerpt, setExcerpt] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [poll, setPoll] = React.useState(false);
  const [status, setStatus] = React.useState("active");
  const [error, setError] = React.useState(null);
  const [success, setMessage] = React.useState(null);
  const [btnLoading, setBtnLoading] = React.useState(0);
  const token = localStorage.getItem("token");
  const handleChange = (event) => {
    setCategory(event.target.value);
  };
  const [imageId, setImageId] = React.useState("");
  const [featuredImage, setFeaturedImage] = React.useState("");

  React.useEffect(() => {
    getAllCategories();
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
      if (news.pollTitle !== "") {
        setPoll(true);
        setPollTitle(news.pollTitle);
      }
      setStatus(news.status);
      setFeaturedImage(news.media[0]["path"]);
      //setCategory(news.category);
    }
  }, []);
  const getAllCategories = async () => {
    const response = await axios.get("/category/all/-1");
    let data = [];
    response.data.map((category) => {
      console.log(category);
    });
    setCategoriesList(data);
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
    if (!poll) setPollTitle("");
    const apiUrl = news === undefined ? "create" : "edit/" + news.id;
    const apiData = `title=${title}&content=${content}&excerpt=${excerpt}
    &category=7dcfd5f4-900c-4bda-a9d1-f623f43d8369&status=${status}&media=${imageId}
    &pollTitle=${pollTitle}&content=${content}`;
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
      const { response } = await axios(config);
      setMessage(response.msg);
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

  const handleClose = () => {
    setOpen(false);
  };

  const handleChangeStatus = (event) => {
    setStatus(event.target.value);
  };

  const handleChangePoll = (event) => {
    setPoll(event.target.value);
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
                label="Type something here..."
              />
            </MuiThemeProvider>
            <CustomInput
              labelText="Short Description"
              id="excerpt"
              inputProps={{
                value: excerpt,
              }}
              formControlProps={{
                fullWidth: true,
                onChange: (event) => setExcerpt(event.target.value),
              }}
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
            <FormControl className={classes.formControl}>
              <InputLabel id="demo-mutiple-chip-label">Category</InputLabel>
              <Select
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
                        key={value.id}
                        label={value.id}
                        className={classes.chip}
                      />
                    ))}
                  </div>
                )}
                MenuProps={MenuProps}
              >
                {categories.map((name) => (
                  <MenuItem
                    key={name}
                    value={name}
                    style={getStyles(name, category, theme)}
                  >
                    {name}
                  </MenuItem>
                ))}
              </Select>
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
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="simple-modal-title"
              aria-describedby="simple-modal-description"
            >
              <div className={classes.paper}>
                <MediaLibrary
                  sendDataToParent={sendDataToParent}
                  imageUrl={featuredImage}
                />
              </div>
            </Modal>
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
                id="float"
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
