import * as React from "react";
import { Link } from "react-router-dom";
import { Tweet } from "../../state/Tweet";
import { RowSpacer } from "../layout/row-spacer/RowSpacer";

import "./styles.css";

interface Props {
  tweet: Tweet;
}

export const TweetComponent: React.StatelessComponent<Props> = ({ tweet }) => (
  <article>
    <header className="tweet__header">
      <span className="author">
        <Link to={`/profile/${tweet.author}`}>{tweet.author}</Link>
      </span>

      <RowSpacer />

      <span className="date">
        {new Date(tweet.postedAt.epochSecond * 1000).toLocaleDateString()}
      </span>
    </header>

    <section>{tweet.content}</section>
  </article>
);
