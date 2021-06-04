import React, { useState, useContext } from "react";
import axios from "axios";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Alert from "@material-ui/lab/Alert";
import { UserContext } from "../../auth/AuthContext";
// import FormControlLabel from "@material-ui/core/FormControlLabel";
// import Checkbox from "@material-ui/core/Checkbox";
// import Link from "@material-ui/core/Link";
// import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Login() {
  const classes = useStyles();
  const user = useContext(UserContext);
  const [uEmail, setEmail] = useState("");
  const [uPass, setPassword] = useState("");
  const [btnLoading, setBtnLoading] = useState(0);
  const [lError, setError] = useState(null);
  console.log(user);
  const handleSignIn = async (event) => {
    setError(null);
    event.preventDefault();
    setBtnLoading(1);
    if (uEmail == "" || uPass == "") {
      setBtnLoading(0);
      setError("All fields are required");
      return;
    }
    const loginData = `email=${uEmail}&password=${uPass}`;
    const config = {
      method: "post",
      url: "/auth/login",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: loginData,
    };
    try {
      const { data } = await axios(config);
      console.log(data);
      setBtnLoading(0);
    } catch (error) {
      setBtnLoading(0);
      const { data } = error.response;
      setError(data.msg);
    }
  };
  const onChangeHandler = (event) => {
    const { name, value } = event.currentTarget;

    if (name === "userEmail") {
      setEmail(value);
    } else if (name === "userPassword") {
      setPassword(value);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          {lError !== null ? <Alert severity="error">{lError}</Alert> : ""}
          <TextField
            variant="outlined"
            margin="normal"
            onChange={(event) => onChangeHandler(event)}
            required
            fullWidth
            id="userEmail"
            label="Email Address"
            name="userEmail"
            autoComplete="email"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            onChange={(event) => onChangeHandler(event)}
            required
            fullWidth
            name="userPassword"
            label="Password"
            type="password"
            id="userPassword"
            autoComplete="current-password"
          />
          {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          /> */}
          <Button
            type="submit"
            onClick={(event) => {
              handleSignIn(event);
            }}
            fullWidth
            variant="contained"
            color="primary"
            disabled={btnLoading}
            className={classes.submit}
          >
            {btnLoading ? "Loading..." : "Login"}
          </Button>
          {/* <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid> */}
        </form>
      </div>
    </Container>
  );
}
