import React, { useState, useEffect } from "react";
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

import { Box, Button, Grid, Card } from "@material-ui/core";
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
  const [shops, setShops] = useState([
    {
      prefecture: "奈良県",
      town: "十津川村25",
      shopName: "十津川道の駅",
      hubsURL: "https://localhost:8080/hub.html?hub_id=?"
    },
    {
      prefecture: "奈良県",
      town: "奈良市",
      shopName: "鹿せんべいの店",
      hubsURL: "https://localhost:8080/hub.html?hub_id=?"
    },
    {
      prefecture: "京都府",
      town: "京都市左京区吉田河原町",
      shopName: "京都物産館",
      hubsURL: "https://localhost:8080/hub.html?hub_id=?"
    }
  ]);
  useEffect(() => {
    const fetchData = () => {
      fetch("http://localhost:3000/travel", {})
        .then(res => res.json())
        .then(json => {
          store.getAddress(json["travel"]);
          console.log("state", store.state.gerAddress);

          // stateの重複しているか, 同一の店なのか検知が無いので重複は削除
          const tempMap = {};
          for (const gerAddress of store.state.gerAddress) {
            tempMap[JSON.stringify(gerAddress)] = gerAddress;
          }
          let address = [];
          for (const [_, value] of Object.entries(tempMap)) {
            address.push(value);
          }
          setShops(address);
        });
    };
    fetchData();
  }, []);

  const prefectureList = Array.from(
    new Set(
      shops.reduce((acc, value) => {
        acc.push(value.prefecture);
        return acc;
      }, [])
    )
  );

  // store.state.getAddress
  // [{"prefecture": "京都府xxx","town": "京都市右京区","shopName": "かしや","hubsURL": "https://hubs.com/???"},{"prefecture": "京都府xxx","town": "京都市右京区","shopName": "かしや","hubsURL": "https://hubs.com/???"}]
  return (
    <WrappedIntlProvider locale={getLocale()} messages={getMessages()}>
      <AuthContextProvider store={store}>
        {/* {JSON.stringify(store.state)} */}
        <Header />
        <Box marginTop={8} mx={1}>
          <Box my={4}>
            <Grid container justify="center">
              <List dense>
                {prefectureList.map(prefecture => {
                  return (
                    <ListItem dense disableGutters key={prefecture}>
                      <Grid container justify="center" direction="row">
                        {prefecture}
                        {shops.filter(_shop => _shop.prefecture == prefecture).map((shop, index) => {
                          return (
                            <ListItem disableGutters key={index}>
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
                                    <Button size="small" onClick={() => window.open(shop.hubsURL)}>
                                      Go to VR
                                    </Button>
                                  </CardActions>
                                </Card>
                              </Box>
                            </ListItem>
                          );
                        })}
                      </Grid>
                    </ListItem>
                  );
                })}
              </List>
            </Grid>
          </Box>
        </Box>
      </AuthContextProvider>{" "}
    </WrappedIntlProvider>
  );
}

// (async () => {
//   fetch("http://localhost:3000/travel", {})
//     .then(res => res.json())
//     .then(json => {
//       store.getAddress(json["travel"]);
//       console.log("state", store.state);
//     });
// })();

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
