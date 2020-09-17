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
import AddIcon from "@material-ui/icons/Add";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles } from "@material-ui/core/styles";

// import { AuthContextProvider } from "./scene-entry-manager";

registerTelemetry("/clerk", "Hubs Sign In Page");

const store = new Store();
window.APP = {
  store
};

const prefectureList = ["北海道", "東京都", "大阪府", "沖縄県"];

const useStyles = makeStyles(() => ({
  list: {
    // width: "100%",
    // maxWidth: 360,
    // backgroundColor: theme.palette.background.paper
    margin: "0px"
  }
}));

function Root() {
  const [prefecture, setPrefecture] = useState(prefectureList[0]);
  const [town, setTown] = useState("京都市中京区 二条下ル土橋町10番地");
  const [shopName, setShopName] = useState("京みやげ売店");
  const [goodsURL, setGoodsURL] = useState("");
  const [goodsURLs, setGoodsURLs] = useState([]);

  const click = () => console.log(prefecture, town, shopName, goodsURLs);
  const classes = useStyles();

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
          <Box>
            <Grid container alignItems="flex-end" direction="row">
              <Grid item xs={10}>
                <TextField required label="商品のURL" onChange={e => setGoodsURL(e.target.value)} fullWidth />
              </Grid>
              <Grid item xs={1}>
                <Button
                  color="primary"
                  size="medium"
                  startIcon={<AddIcon />}
                  onClick={() => setGoodsURLs([...goodsURLs, goodsURL])}
                />
              </Grid>
            </Grid>
          </Box>
          <Box>
            <List>
              {["https://amazom.com/aaadddda", "https://amazom.com/", "https://amazom.com/xxxxxxxxxxx"].map(value => {
                return (
                  <ListItem key={value}>
                    <Grid container alignItems="flex-end" direction="row">
                      <Grid item xs={9}>
                        <ListItemText id={value} primary={value} />
                      </Grid>
                      <Grid item xs={1}>
                        <ListItem button={true} id={value}>
                          <Button startIcon={<AddIcon />} size="medium" />
                        </ListItem>
                      </Grid>
                    </Grid>
                  </ListItem>
                );
              })}
            </List>
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
