import { observer } from "mobx-react";
import * as React from "react";
import { Link } from "react-router-dom";
import { Tweet } from "../../state/Tweet";
import { UserStore } from "../../state/User";
import { RowSpacer } from "../layout/row-spacer/RowSpacer";

import "./styles.css";

interface Props {
  store: UserStore;
  tweet: Tweet;
}

export const TweetComponent: React.StatelessComponent<Props> = observer(
  ({ store, tweet }) => (
    <article>
      <header className="tweet__header">
        <span className="author">
          <Link to={`/profile/${tweet.author}`}>
            {store.users.get(tweet.author) &&
              store.users.get(tweet.author).username}
          </Link>
        </span>

        <RowSpacer />

        <span className="date">
          {new Date(tweet.postedAt.epochSecond * 1000).toLocaleDateString()}
        </span>
      </header>

      <section>{tweet.content}</section>
    </article>
  )
);
