import React from "react";
import ReactDOM from "react-dom";
import { WrappedIntlProvider } from "./react-components/wrapped-intl-provider";
import registerTelemetry from "./telemetry";
import Store from "./storage/store";
import "./utils/theme";
import { getLocale, getMessages } from "./utils/i18n";
import { AuthContextProvider } from "./react-components/auth/AuthContext";
// import { SignInPage } from "./react-components/auth/SignInPage";
import "./assets/stylesheets/globals.scss";

// import { AuthContextProvider } from "./scene-entry-manager";

registerTelemetry("/admin", "Hubs Sign In Page");

const store = new Store();
window.APP = {
  store
};

function click(url) {
  console.log(store.state);
  // spawnMediaInfrontOfPlayer();
}

function Root() {
  return (
    <WrappedIntlProvider locale={getLocale()} messages={getMessages()}>
      <AuthContextProvider store={store}>
        {" "}
        {location.search} <input id="url" type="text" value="https://www.youtube.com/watch?v=xyN9PskyXgw" />
        <button onClick={click.bind(document.getElementById("url"))}> Create </button>{" "}
      </AuthContextProvider>{" "}
    </WrappedIntlProvider>
  );
}

ReactDOM.render(<Root />, document.getElementById("ui-root"));
