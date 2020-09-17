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

import { Box, Button, Grid, TextField, Card } from "@material-ui/core";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

// import { AuthContextProvider } from "./scene-entry-manager";

registerTelemetry("/tourist", "Hubs Sign In Page");
const store = new Store();

window.APP = {
  store
};

function Root() {
  const click = async () => {};

  const link = "https://localhost:8080/clerk";
  const PREFECTURE_LIST = [
    "北海道",
    "青森県",
    "岩手県",
    "宮城県",
    "秋田県",
    "山形県",
    "福島県",
    "茨城県",
    "栃木県",
    "群馬県",
    "埼玉県",
    "千葉県",
    "東京都",
    "神奈川県",
    "新潟県",
    "富山県",
    "石川県",
    "福井県",
    "山梨県",
    "長野県",
    "岐阜県",
    "静岡県",
    "愛知県",
    "三重県",
    "滋賀県",
    "京都府",
    "大阪府",
    "兵庫県",
    "奈良県",
    "和歌山県",
    "鳥取県",
    "島根県",
    "岡山県",
    "広島県",
    "山口県",
    "徳島県",
    "香川県",
    "愛媛県",
    "高知県",
    "福岡県",
    "佐賀県",
    "長崎県",
    "熊本県",
    "大分県",
    "宮崎県",
    "鹿児島県",
    "沖縄県"
  ];
  const shops = [
    { prefecture: "奈良県", town: "生駒市十津川村25", shopName: "十津川道の駅" },
    { prefecture: "京都府", town: "京都市左京区吉田河原町", shopName: "京都物産館" }
  ];
  const prefectureList = shops.reduce((acc, value) => {
    acc.push(value.prefecture);
    return acc;
  }, []);

  return (
    <WrappedIntlProvider locale={getLocale()} messages={getMessages()}>
      <AuthContextProvider store={store}>
        {/* {JSON.stringify(store.state)} */}
        <Header />
        <Box marginTop={8} marginX={2}>
          <Box my={4}>
            <Grid container justify="center">
              <List dense>
                {prefectureList.map(prefecture => {
                  return (
                    <ListItem dense key={prefecture}>
                      {prefecture}
                      <br />
                      <List dense>
                        {shops.filter(_shop => _shop.prefecture == prefecture).map((shop, index) => {
                          return (
                            <ListItem key={index}>
                              <Box width="100%" marginY={1}>
                                <Card variant="elevation">
                                  <CardContent>
                                    <Typography color="textSecondary" variant="body2" gutterBottom>
                                      {shop.town}
                                    </Typography>
                                    <Typography variant="h5" component="h2">
                                      {shop.shopName}
                                    </Typography>
                                    <Typography color="textSecondary" variant="body2">
                                      食べ物、お土産
                                    </Typography>
                                  </CardContent>
                                  <CardActions>
                                    <Button size="small">Go to VR</Button>
                                  </CardActions>
                                </Card>
                              </Box>
                            </ListItem>
                          );
                        })}
                      </List>
                    </ListItem>
                  );
                })}
              </List>

              {/* <List dense>{shops.map((shop, index) => {})}</List> */}
              <Box width="100%" marginY={1}>
                <Card variant="elevation">
                  <CardContent>
                    <Typography color="textSecondary" variant="body2" gutterBottom>
                      生駒市十津川村25
                    </Typography>
                    <Typography variant="h5" component="h2">
                      十津川道の駅
                    </Typography>
                    <Typography color="textSecondary" variant="body2">
                      食べ物、お土産
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">Go to VR</Button>
                  </CardActions>
                </Card>
              </Box>

              <Box width="100%" marginY={1}>
                <Card variant="elevation">
                  <CardContent>
                    <Typography color="textSecondary" variant="body2" gutterBottom>
                      京都市左京区吉田河原町
                    </Typography>
                    <Typography variant="h5" component="h2">
                      京都物産館
                    </Typography>
                    <Typography color="textSecondary" variant="body2">
                      食べ物、お土産
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">Go to VR</Button>
                  </CardActions>
                </Card>
              </Box>
            </Grid>
          </Box>
        </Box>
      </AuthContextProvider>{" "}
    </WrappedIntlProvider>
  );
}

ReactDOM.render(<Root />, document.getElementById("ui-root"));

{
  /* <Button
                variant="contained"
                color="primary"
                size="large"
                startIcon={<LinkIcon />}
                onClick={() => {
                  window.location.href = link;
                }}
              >
                Go to VR
              </Button> */
}
