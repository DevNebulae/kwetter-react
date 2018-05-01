import * as React from "react";
import { Timeline } from "../timeline/Timeline";
import { TweetForm } from "../tweet-form/TweetForm";

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
