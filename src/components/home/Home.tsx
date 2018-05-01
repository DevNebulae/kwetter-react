import * as React from "react";
import { Timeline } from "../timeline/Timeline";
import { TweetForm } from "../tweet-form/TweetForm";

export class Home extends React.Component {
  public render() {
    return (
      <>
        <TweetForm />
        <Timeline />
      </>
    );
  }
}
