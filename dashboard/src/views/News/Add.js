import React from "react";
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

const names = [
  "Oliver Hansen",
  "Van Henry",
  "April Tucker",
  "Ralph Hubbard",
  "Omar Alexander",
  "Carlos Abbott",
  "Miriam Wagner",
  "Bradley Wilkerson",
  "Virginia Andrews",
  "Kelly Snyder",
];

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function AddNews() {
  const theme = useTheme();
  const classes = useStyles();
  const [personName, setPersonName] = React.useState([]);
  const handleChange = (event) => {
    setPersonName(event.target.value);
  };

  const [status, setStatus] = React.useState("active");

  const handleChangeStatus = (event) => {
    setStatus(event.target.value);
  };

  const [poll, setPoll] = React.useState(false);

  const handleChangePoll = (event) => {
    setPoll(event.target.value);
  };
  return (
    <Card>
      <CardHeader color="info">
        <h4 className={classes.cardTitleWhite}>Add News</h4>
      </CardHeader>
      <CardBody>
        <Grid container>
          <GridItem xs={12} sm={12} md={8}>
            <CustomInput
              labelText="News Title"
              id="float"
              formControlProps={{
                fullWidth: true,
              }}
            />
            <MuiThemeProvider theme={defaultTheme}>
              <MUIRichTextEditor label="Type something here..." />
            </MuiThemeProvider>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Add News
            </Button>
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <FormControl className={classes.formControl}>
              <InputLabel id="demo-mutiple-chip-label">Category</InputLabel>
              <Select
                labelId="demo-mutiple-chip-label"
                id="demo-mutiple-chip"
                multiple
                value={personName}
                onChange={handleChange}
                input={<Input id="select-multiple-chip" />}
                renderValue={(selected) => (
                  <div className={classes.chips}>
                    {selected.map((value) => (
                      <Chip
                        key={value}
                        label={value}
                        className={classes.chip}
                      />
                    ))}
                  </div>
                )}
                MenuProps={MenuProps}
              >
                {names.map((name) => (
                  <MenuItem
                    key={name}
                    value={name}
                    style={getStyles(name, personName, theme)}
                  >
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <CustomInput
              labelText="image"
              id="float"
              formControlProps={{
                fullWidth: true,
              }}
            />
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
                formControlProps={{
                  fullWidth: true,
                }}
              />
            )}
          </GridItem>
        </Grid>
      </CardBody>
    </Card>
  );
}