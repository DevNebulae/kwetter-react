import * as React from "react";
import styled from "react-emotion";
import { Route, Switch } from "react-router";
import { Header } from "../header/Header";
import { Home } from "../home/Home";
import { Profile } from "../profile/Profile";
import { SearchOverview } from "../search/SearchOverview";

const AppContainer = styled("div")`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
`;

class App extends React.Component {
  public render() {
    return (
      <AppContainer>
        <Header />

        <Switch>
          <Route exact={true} path="/" component={Home} />
          <Route exact={true} path="/profile/:accountId" component={Profile} />
          <Route exact={true} path="/search" component={SearchOverview} />
        </Switch>
      </AppContainer>
    );
  }
}

export default App;
