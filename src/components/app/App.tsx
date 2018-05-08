import axios from "axios";
import * as React from "react";

import { Route, Switch } from "react-router";
import { Header } from "../header/Header";
import { Home } from "../home/Home";
import { Profile } from "../profile/Profile";

import "./styles.css";

class App extends React.Component {
  public componentDidMount() {
    // tslint:disable-next-line
    console.log(axios.get("http://localhost:8080/hateoas/tweets"));
  }

  public render() {
    return (
      <div className="application__container">
        <Header />

        <Switch>
          <Route exact={true} path="/" component={Home} />
          <Route exact={true} path="/profile/:accountId" component={Profile} />
        </Switch>
      </div>
    );
  }
}

export default App;
