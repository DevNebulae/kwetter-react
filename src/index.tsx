import axios from "axios";
import * as Keycloak from "keycloak-js";
import * as React from "react";
import * as ReactDOM from "react-dom";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";

const kc = Keycloak({
  clientId: "kwetter-frontend-app",
  realm: "kwetter",
  url: "http://localhost:8082/auth"
});
kc.init({ onLoad: "login-required" }).success(authenticated => {
  if (authenticated) {
    ReactDOM.render(<App />, document.getElementById("root") as HTMLElement);
    axios.defaults.headers.common.Authorization = kc.token;
  }
});

axios.interceptors.request.use((config: any) => {
  return refreshToken()
    .then(() => {
      config.headers.Authorization = `Bearer ${kc.token}`;
      return Promise.resolve(config);
    })
    .catch(() => {
      kc.login();
    });
});

const refreshToken = (minValidity = 5) => {
  return new Promise((resolve, reject) => {
    kc
      .updateToken(minValidity)
      .success(() => resolve())
      .error(error => reject(error));
  });
};

registerServiceWorker();
