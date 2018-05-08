import axios from "axios";
import { observer } from "mobx-react";
import * as React from "react";
import { Link } from "react-router-dom";
import { kc } from "../../..";
import { Tweet, tweetStore } from "../../../state/Tweet";
import { UserStore, userStore } from "../../../state/User";
import { TweetComponent } from "../../tweet/Tweet";

interface Props {
  store: UserStore;
  accountId: string;
}

interface State {
  tweets: Tweet[];
}

@observer
export class ProfileData extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { tweets: [] };
  }

  public componentDidMount() {
    axios
      .get<Tweet[]>(
        `http://localhost:8080/tweets/timeline/${this.props.accountId}`
      )
      .then(tweets => this.setState({ tweets: tweets.data }));
  }

  public render() {
    const { accountId, store } = this.props;
    const user = store.users.get(accountId);
    const isSameAccount = kc.subject === accountId;
    const isFollowing = store.following.has(accountId);

    const followers = Array.from(store.followerList.values())
      .filter(follower => follower.followed === accountId)
      .map(follower => follower.follower);
    const following = Array.from(store.followerList.values())
      .filter(follower => follower.follower === accountId)
      .map(follower => follower.followed);

    return !user || !kc.subject ? (
      <div />
    ) : (
      <div style={{ gridColumn: "3 / span 8" }}>
        <h2>Profile</h2>
        <ul>
          <li>User id {user.id}</li>
          <li>User enabled? {user.enabled}</li>
          <li>User first name {user.firstName}</li>
          <li>User last name {user.lastName}</li>
          <li>User username {user.username}</li>
        </ul>

        <hr />

        <div>
          <h2>Followers ({followers.length})</h2>
          <ul>
            {followers.map((follower, index) => {
              const followerUser = store.users.get(follower);
              return (
                <li key={index}>
                  <Link to={`/profile/${follower}`}>
                    {followerUser && followerUser.username}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        <hr />

        <div>
          <h2>Following ({following.length})</h2>
          <ul>
            {following.map((follower, index) => {
              const followingUser = store.users.get(follower);
              return (
                <li key={index}>
                  <Link to={`/profile/${follower}`}>
                    {followingUser && followingUser.username}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        {!isSameAccount &&
          !isFollowing && (
            <button onClick={this.onFollow} type="button">
              Follow
            </button>
          )}

        {!isSameAccount &&
          isFollowing && (
            <button onClick={this.onUnfollow} type="button">
              Unfollow
            </button>
          )}

        <ol>
          {this.state.tweets.map((tweet, index) => (
            <TweetComponent
              key={index}
              tweetStore={tweetStore}
              userStore={userStore}
              tweet={tweet}
            />
          ))}
        </ol>
      </div>
    );
  }

  private onFollow = () => {
    this.props.store.follow(this.props.accountId);
  };

  private onUnfollow = () => {
    this.props.store.unfollow(this.props.accountId);
  };
}
