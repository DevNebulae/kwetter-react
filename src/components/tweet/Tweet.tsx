import { observer } from "mobx-react";
import * as React from "react";
import { Link } from "react-router-dom";
import { kc } from "../..";
import { Tweet, TweetStore } from "../../state/Tweet";
import { UserStore } from "../../state/User";
import { RowSpacer } from "../layout/row-spacer/RowSpacer";

import "./styles.css";

interface Props {
  tweet: Tweet;
  tweetStore: TweetStore;
  userStore: UserStore;
}

@observer
export class TweetComponent extends React.Component<Props> {
  public render() {
    const { tweet, userStore } = this.props;
    const user = userStore.users.get(tweet.author);

    return (
      <article style={{ marginBottom: "32px" }}>
        <header className="tweet__header" style={{ marginBottom: "16px" }}>
          <span className="author">
            <Link to={`/profile/${tweet.author}`}>{user && user.username}</Link>
          </span>

          <RowSpacer />

          <span className="date">
            {new Date(tweet.postedAt.epochSecond * 1000).toISOString()}
          </span>
        </header>

        <section style={{ marginBottom: "16px" }}>{tweet.content}</section>

        {tweet.author === kc.subject && (
          <section className="actions">
            <button onClick={this.onDelete} type="button">
              Delete
            </button>
          </section>
        )}
      </article>
    );
  }

  private onDelete = () => {
    this.props.tweetStore.deleteTweet(this.props.tweet.id);
  };
}
