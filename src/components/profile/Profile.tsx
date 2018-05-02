import axios from "axios";
import * as React from "react";

interface User {
  id: string;
  username: string;
  enabled: boolean;
  firstName: string;
  lastName: string;
}

interface Props {
  match: {
    params: {
      accountId: string;
    };
  };
}

interface State {
  user: User | null;
}

export class UserProfile extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      user: null
    };
  }
  public componentDidMount() {
    axios
      .get<User>(
        `http://localhost:8080/accounts/${this.props.match.params.accountId}`
      )
      .then(user =>
        this.setState({
          user: user.data
        })
      );
  }

  public render() {
    const { user } = this.state;
    return !user ? (
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

        {/* {kc.subject !== this.props.match.params.accountId && (
          <button type="button">Follow</button>
        )} */}
      </>
    );
  }
}
