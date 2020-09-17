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
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";

// import { AuthContextProvider } from "./scene-entry-manager";

registerTelemetry("/clerk", "Hubs Sign In Page");
const store = new Store();

window.APP = {
  store
};

const prefectureList = [
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

function Root() {
  const [prefecture, setPrefecture] = useState(prefectureList[25]);
  const [town, setTown] = useState("京都市中京区 二条下ル土橋町10番地");
  const [shopName, setShopName] = useState("うまい八つ橋屋");
  const [goodsURL, setGoodsURL] = useState("");
  const [goodsURLs, setGoodsURLs] = useState(["https://paypaymall.yahoo.co.jp/store/trv/item/61211967"]);
  const [resourceURL, setResourceURL] = useState("");
  const [resourceURLs, setResourceURLs] = useState([
    "https://item-shopping.c.yimg.jp/i/n/trv_61211967",
    "https://www.youtube.com/watch?v=iBnHVz1SGpw",
    "http://www.ritsumei.ac.jp/~t-ito/otakara/otakara-kyo2008/yatuhasi.pdf"
  ]);

  const click = async () => {
    const address = { prefecture: prefecture, town: town, shopName: shopName };
    store.updateAddress(address);
    store.updateGoodsURLs(goodsURLs);
    store.updateResourceURLs(resourceURLs);
    store.updateAdmin();
    // await fetch("http://localhost:3000", "POST", address);
    console.log(store.state);
    document.location = "/";
  };

  return (
    <WrappedIntlProvider locale={getLocale()} messages={getMessages()}>
      <AuthContextProvider store={store}>
        {/* {JSON.stringify(store.state)} */}
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
                <TextField
                  required
                  label="紹介したいサイトのURL(商品購入サイトなど)"
                  value={goodsURL}
                  onChange={e => setGoodsURL(e.target.value)}
                  fullWidth
                />
              </Grid>
              <Grid item xs={1}>
                <Button
                  color="primary"
                  size="medium"
                  startIcon={<AddIcon />}
                  onClick={() => {
                    if (goodsURL) {
                      setGoodsURLs([...goodsURLs, goodsURL]);
                      setGoodsURL("");
                    }
                  }}
                />
              </Grid>
            </Grid>
          </Box>
          <Box>
            <List dense>
              {goodsURLs.map((url, index) => {
                return (
                  <ListItem key={url}>
                    <Grid container alignItems="flex-end" direction="row">
                      <Grid item xs={9}>
                        <ListItemText id={url} primary={url} />
                      </Grid>
                      <Grid item xs={1}>
                        <ListItemSecondaryAction>
                          <IconButton
                            edge="end"
                            aria-label="delete"
                            onClick={() => {
                              const newGoodsURLs = [...goodsURLs];
                              newGoodsURLs.splice(index, 1);
                              setGoodsURLs(newGoodsURLs);
                            }}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </ListItemSecondaryAction>
                      </Grid>
                    </Grid>
                  </ListItem>
                );
              })}
            </List>
          </Box>

          <Box>
            <Grid container alignItems="flex-end" direction="row">
              <Grid item xs={10}>
                <TextField
                  required
                  label="他のコンテンツのURL(動画や,画像, PDFなど)"
                  value={resourceURL}
                  onChange={e => setResourceURL(e.target.value)}
                  fullWidth
                />
              </Grid>
              <Grid item xs={1}>
                <Button
                  color="primary"
                  size="medium"
                  startIcon={<AddIcon />}
                  onClick={() => {
                    if (resourceURL) {
                      setResourceURLs([...resourceURLs, resourceURL]);
                      setResourceURL("");
                    }
                  }}
                />
              </Grid>
            </Grid>
          </Box>
          <Box>
            <List dense>
              {resourceURLs.map((url, index) => {
                return (
                  <ListItem key={url}>
                    <Grid container alignItems="flex-end" direction="row">
                      <Grid item xs={9}>
                        <ListItemText id={url} primary={url} />
                      </Grid>
                      <Grid item xs={1}>
                        <ListItemSecondaryAction>
                          <IconButton
                            edge="end"
                            aria-label="delete"
                            onClick={() => {
                              const newResourceURLs = [...resourceURLs];
                              newResourceURLs.splice(index, 1);
                              setResourceURLs(newResourceURLs);
                            }}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </ListItemSecondaryAction>
                      </Grid>
                    </Grid>
                  </ListItem>
                );
              })}
            </List>
          </Box>

          <Box my={4}>
            <Grid container justify="center">
              <Button
                variant="contained"
                color="secondary"
                size="large"
                startIcon={<SaveIcon />}
                onClick={() => click()}
              >
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
