import * as React from "react";
import { Route, Switch } from "react-router";
import { Header } from "../header/Header";
import { Home } from "../home/Home";
import { UserProfile } from "../profile/Profile";

import "./styles.css";

class App extends React.Component {
  public render() {
    return (
      <div className="application__container">
        <Header />

        <Switch>
          <Route exact={true} path="/" component={Home} />
          <Route
            exact={true}
            path="/profile/:accountId"
            component={UserProfile}
          />
        </Switch>
      </div>
    );
  }
}

export default App;
