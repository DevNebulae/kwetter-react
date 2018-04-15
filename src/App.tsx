import * as React from "react";
import { Timeline } from "./components/Timeline";
import { TweetForm } from "./components/TweetForm";

class App extends React.Component {
  public render() {
    return (
      <>
        <header>
          <h1>Kwetter</h1>

          <nav />
        </header>

        <main>
          <TweetForm />
          <Timeline />
        </main>
      </>
    );
  }
}

export default App;
