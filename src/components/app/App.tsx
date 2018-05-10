import * as React from "react";
import { Route, Switch } from "react-router";
import { Header } from "../header/Header";
import { Home } from "../home/Home";
import { Profile } from "../profile/Profile";
import { SearchOverview } from "../search/SearchOverview";

import "./styles.css";

class App extends React.Component {
  public render() {
    return (
      <div className="application__container">
        <Header />

        <Switch>
          <Route exact={true} path="/" component={Home} />
          <Route exact={true} path="/profile/:accountId" component={Profile} />
          <Route exact={true} path="/search" component={SearchOverview} />
        </Switch>
      </div>
    );
  }
}

export default App;
