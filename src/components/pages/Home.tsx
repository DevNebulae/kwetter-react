import * as React from "react";
import { Timeline } from "../Timeline";
import { TweetForm } from "../TweetForm";

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
