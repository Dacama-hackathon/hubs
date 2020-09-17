import React from "react";
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
import { spacing } from "@material-ui/system";

import { Box, Grid, TextField } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";

// import { AuthContextProvider } from "./scene-entry-manager";

registerTelemetry("/clerk", "Hubs Sign In Page");

const store = new Store();
window.APP = {
  store
};

function click(url) {
  console.log(document.getElementById("url").value);
  // spawnMediaInfrontOfPlayer();
}

const todofuken = [
  { value: "hokkaido", label: "北海道" },
  { value: "tokyo", label: "東京都" },
  { value: "osaka", label: "大阪府" }
];

function Root() {
  return (
    <WrappedIntlProvider locale={getLocale()} messages={getMessages()}>
      <AuthContextProvider store={store}>
        <Header />
        <Box marginTop={12} marginBottom={3} marginX={3}>
          <Grid container spacing={0}>
            <Grid item xs>
              <Autocomplete
                marginY={10}
                id="combo-box-demo"
                options={todofuken}
                getOptionLabel={option => option.label}
                // style={{ width: 400 }}
                renderInput={params => <TextField {...params} label="都道府県" variant="outlined" />}
              />
              <TextField
                marginY={10}
                required
                id="standard-basic"
                label="市町村区"
                defaultValue="京都市中京区 二条下ル土橋町10番地"
              />
              <TextField marginY={10} required id="standard-required" label="店名" defaultValue="京みやげ売店" />
            </Grid>
          </Grid>
          aaa
        </Box>
      </AuthContextProvider>{" "}
    </WrappedIntlProvider>
  );
}

ReactDOM.render(<Root />, document.getElementById("ui-root"));
