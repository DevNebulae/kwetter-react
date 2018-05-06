import { observer } from "mobx-react";
import * as React from "react";
import { kc } from "../../..";
import { UserStore } from "../../../state/User";

interface Props {
  store: UserStore;
  accountId: string;
}

@observer
export class ProfileData extends React.Component<Props> {
  public render() {
    const { accountId, store } = this.props;
    const user = store.users.get(accountId);
    // const isSameAccount = kc.subject === accountId;
    const isFollowing = store.following.has(accountId);

    // tslint:disable-next-line
    console.log(store.following);

    return !user || !kc.subject ? (
      <div />
    ) : (
      <>
        <ul>
          <li>User id {user.id}</li>
          <li>User enabled? {user.enabled}</li>
          <li>User first name {user.firstName}</li>
          <li>User last name {user.lastName}</li>
          <li>User username {user.username}</li>
        </ul>

        {Array.from(store.following.values()).map((following, index) => (
          <p key={index}>{following}</p>
        ))}

        {(isFollowing && (
          <button onClick={this.onUnfollow} type="button">
            Unfollow
          </button>
        )) || (
          <button onClick={this.onFollow} type="button">
            Follow
          </button>
        )}

        {/*         

        {kc.subject !== accountId &&
          (store.following.has(accountId) ? (
            <button onClick={this.onUnfollow} type="button">
              Unfollow
            </button>
          ) : (
            <button onClick={this.onFollow} type="button">
              Follow
            </button>
          ))} */}
      </>
    );
  }

  private onFollow = () => {
    this.props.store.follow(this.props.accountId);
  };

  private onUnfollow = () => {
    this.props.store.unfollow(this.props.accountId);
  };
}
