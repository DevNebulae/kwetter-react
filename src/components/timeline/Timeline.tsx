import { observer } from "mobx-react";
import * as React from "react";
import { TweetStore } from "../../state/Tweet";
import { userStore } from "../../state/User";
import { TweetComponent } from "../tweet/Tweet";

import "./styles.css";

interface Props {
  store: TweetStore;
}

@observer
export class Timeline extends React.Component<Props> {
  public render() {
    return (
      <main className="timeline">
        {this.props.store.tweets.map((tweet, index) => (
          <TweetComponent key={index} store={userStore} tweet={tweet} />
        ))}
      </main>
    );
  }
}
