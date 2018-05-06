import * as React from "react";
import { userStore } from "../../state/User";
import { ProfileData } from "./data/ProfileData";

interface Props {
  match: {
    params: {
      accountId: string;
    };
  };
}

export const Profile: React.StatelessComponent<Props> = ({ match }) => (
  <>
    <ProfileData accountId={match.params.accountId} store={userStore} />
  </>
);
