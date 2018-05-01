import { observer } from "mobx-react";
import * as React from "react";
import { TweetStore } from "../../state/Tweet";
import { TweetComponent } from "../tweet/Tweet";

import "./styles.css";

interface Props {
  store: TweetStore;
}

@observer
export class Timeline extends React.Component<Props> {
  public componentDidMount() {
    this.props.store.getTweets();
  }

  public render() {
    return (
      <main className="timeline">
        {this.props.store.tweets.map((tweet, index) => (
          <TweetComponent key={index} tweet={tweet} />
        ))}
      </main>
    );
  }
}
