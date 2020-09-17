import React from "react";
import ReactDOM from "react-dom";
import { useHistory } from "react-router-dom";
import { WrappedIntlProvider } from "./react-components/wrapped-intl-provider";
import registerTelemetry from "./telemetry";
import Store from "./storage/store";
import "./utils/theme";
import { getLocale, getMessages } from "./utils/i18n";
import { AuthContextProvider } from "./react-components/auth/AuthContext";
import { SignInPage } from "./react-components/auth/SignInPage";
import "./assets/stylesheets/globals.scss";

// import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {" "}
      {"Copyright © "}{" "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website{" "}
      </Link>{" "}
      {new Date().getFullYear()} {"."}{" "}
    </Typography>
  );
}

const useStyles = {
  paper: {
    marginTop: "1em",
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: "1em",
    backgroundColor: "whitte"
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: "1em"
  },
  submit: {
    margin: "2em"
  }
};

registerTelemetry("/signin", "Hubs Sign In Page");

const store = new Store();
window.APP = {
  store
};

// const classes = useStyles();

function click(url) {
  console.log(document.getElementById("email").value, 999);
  let history = useHistory();
  if (String(document.getElementById("email").value).indexOf("tourist") !== -1) {
    console.log(777);
    // document.location = "/";
    history.push("/tourist");
  } else {
    history.push("/clerk");
  }
  // spawnMediaInfrontOfPlayer();
}

function Root() {
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={useStyles.paper}>
        <Avatar className={useStyles.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={useStyles.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" />
          <Button
            onClick={() => click()}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={useStyles.submit}
          >
            Sign In
          </Button>
          <Grid container>
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
          </Grid>
        </form>
      </div>
    </Container>
  );
}

ReactDOM.render(<Root />, document.getElementById("ui-root"));
