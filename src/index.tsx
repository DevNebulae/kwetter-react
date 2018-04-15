import * as Keycloak from "keycloak-js";
import * as React from "react";
import * as ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import registerServiceWorker from "./registerServiceWorker";

const kc = Keycloak({
  clientId: "kwetter-frontend-app",
  "public-client": true,
  realm: "kwetter",
  resource: "kwetter-frontend-app",
  "ssl-required": "external",
  url: "http://localhost:8082/auth"
});
kc
  .init({ onLoad: "login-required" })
  .success(authenticated => {
    if (authenticated) {
      ReactDOM.render(<App />, document.getElementById("root") as HTMLElement);
    }
  })
  .error(error => {
    kc.login();
  });

registerServiceWorker();
