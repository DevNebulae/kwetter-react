import * as React from "react";
import { tweetStore } from "../../state/Tweet";
import { Timeline } from "../timeline/Timeline";
import { TweetForm } from "../tweet/form/TweetForm";

export class Home extends React.Component {
  public render() {
    return (
      <>
        <TweetForm store={tweetStore} />
        <Timeline store={tweetStore} />
      </>
    );
  }
}
