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
import SaveIcon from "@material-ui/icons/Save";

// import { AuthContextProvider } from "./scene-entry-manager";

registerTelemetry("/clerk", "Hubs Sign In Page");

const store = new Store();
window.APP = {
  store
};

const prefectureList = ["北海道", "東京都", "大阪府", "沖縄県"];

function Root() {
  const [prefecture, setPrefecture] = useState(prefectureList[0]);
  const [town, setTown] = useState("京都市中京区 二条下ル土橋町10番地");
  const [shopName, setShopName] = useState("京みやげ売店");

  const click = () => console.log(prefecture, town, shopName);

  return (
    <WrappedIntlProvider locale={getLocale()} messages={getMessages()}>
      <AuthContextProvider store={store}>
        <Header />
        <Box marginTop={8} marginX={3}>
          <Box my={4}>
            <Autocomplete
              value={prefecture}
              onChange={(event, newValue) => {
                console.log(newValue);
                setPrefecture(newValue);
              }}
              options={prefectureList}
              renderInput={params => <TextField {...params} label="都道府県" variant="outlined" />}
            />
          </Box>
          <Box my={4}>
            <TextField
              required
              label="市町村区"
              defaultValue={town}
              fullWidth
              onChange={e => setTown(e.target.value)}
            />
          </Box>
          <Box my={4}>
            <TextField
              required
              label="店名"
              defaultValue={shopName}
              fullWidth
              onChange={e => setShopName(e.target.value)}
            />
          </Box>
          <Box my={4}>
            <Grid container justify="center">
              <Button variant="contained" color="primary" size="large" startIcon={<SaveIcon />} onClick={() => click()}>
                Save
              </Button>
            </Grid>
          </Box>
        </Box>
      </AuthContextProvider>{" "}
    </WrappedIntlProvider>
  );
}

ReactDOM.render(<Root />, document.getElementById("ui-root"));
