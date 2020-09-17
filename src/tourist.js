import React, { useState } from "react";
import ReactDOM from "react-dom";
import Header from "./react-components/header";
import { WrappedIntlProvider } from "./react-components/wrapped-intl-provider";
import registerTelemetry from "./telemetry";
import Store from "./storage/store";
import "./utils/theme";
import { getLocale, getMessages } from "./utils/i18n";
import { AuthContextProvider } from "./react-components/auth/AuthContext";
// import { SignInPage } from "./react-components/auth/SignInPage";
import "./assets/stylesheets/globals.scss";
// import { Link } from "react-router-dom";

import { Box, Button, Grid, TextField } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import LinkIcon from "@material-ui/icons/Link";

// import { AuthContextProvider } from "./scene-entry-manager";

registerTelemetry("/tourist", "Hubs Sign In Page");
const store = new Store();

window.APP = {
  store
};

function Root() {
  const click = async () => {};

  const link = "https://localhost:8080/clerk";

  return (
    <WrappedIntlProvider locale={getLocale()} messages={getMessages()}>
      <AuthContextProvider store={store}>
        {/* {JSON.stringify(store.state)} */}
        <Header />
        <Box marginTop={8} marginX={3}>
          <Box my={4}>
            <Grid container justify="center">
              <Button
                variant="contained"
                color="primary"
                size="large"
                startIcon={<LinkIcon />}
                onClick={() => {
                  window.location.href = link;
                }}
              >
                Go to VR
              </Button>
            </Grid>
          </Box>
        </Box>
      </AuthContextProvider>{" "}
    </WrappedIntlProvider>
  );
}

ReactDOM.render(<Root />, document.getElementById("ui-root"));
