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

function click(url) {
  // store.state["address"] = {
  //   prefecture: document.getElementById("combo-box-demo").value,
  //   city: document.getElementById("standard-basic").value,
  //   storeName: document.getElementById("standard-required").value
  // };
  store.updateAddress({
    prefecture: document.getElementById("combo-box-demo").value,
    city: document.getElementById("standard-basic").value,
    storeName: document.getElementById("standard-required").value
  })
  console.log(
    store.state
    // document.getElementById("combo-box-demo").value,
    // document.getElementById("standard-basic").value,
    // document.getElementById("standard-required").value
  );

  // spawnMediaInfrontOfPlayer();
}

const prefectureList = [
  { value: "hokkaido", label: "北海道" },
  { value: "tokyo", label: "東京都" },
  { value: "osaka", label: "大阪府" }
];

function Root() {
  const [prefecture, setPrefecture] = useState("東京都");
  const [town, setTown] = useState("京都市中京区 二条下ル土橋町10番地");
  const [shopName, setShopName] = useState("京みやげ売店");

  return (
    <WrappedIntlProvider locale={getLocale()} messages={getMessages()}>
      <AuthContextProvider store={store}>
        {/* {JSON.stringify(store.state)} */}
        <Header />
        <Box marginTop={8} marginX={3}>
          {/* <Grid container spacing={0}> */}
          {/* <Grid item xs> */}
          <Box my={4}>
            <Autocomplete
              id="combo-box-demo"
              options={prefectureList}
              getOptionLabel={option => option.label}
              // style={{ width: 400 }}
              // onChange={e => {
              //   console.log(e.target.value);
              //   setPrefecture(e.target.label);
              // }}
              renderInput={params => (
                <TextField
                  onChange={e => {
                    console.log(e.target);
                    setPrefecture(e.target.label);
                  }}
                  {...params}
                  label="都道府県"
                  variant="outlined"
                />
              )}
            />
          </Box>
          <Box my={4}>
            <TextField
              required
              id="standard-basic"
              label="市町村区"
              defaultValue={town}
              fullWidth
              onChange={() => console.log(prefecture)}
            />
          </Box>
          <Box my={4}>
            <TextField
              required
              id="standard-required"
              label="店名"
              defaultValue={shopName}
              fullWidth
              onChange={() => console.log(prefecture)}
            />
          </Box>
          <Box m="auto">
            <Grid container justify="center">
              <Button variant="contained" color="primary" size="large" startIcon={<SaveIcon />}>
                Save
              </Button>
            </Grid>
          </Box>
          {/* </Grid> */}
          {/* </Grid> */}
        </Box>
      </AuthContextProvider>{" "}
    </WrappedIntlProvider>
  );
}

ReactDOM.render(<Root />, document.getElementById("ui-root"));
