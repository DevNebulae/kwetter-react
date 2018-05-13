import axios from "axios";
import { action, observable, runInAction } from "mobx";
import { kc } from "..";

// import axios from "axios";
// import { action } from "mobx";

interface Follower {
  id: string;
  follower: string;
  followed: string;
}

interface User {
  id: string;
  username: string;
  enabled: boolean;
  firstName: string;
  lastName: string;
}

export class UserStore {
  @observable public followerList: Follower[] = [];
  @observable public following: string[] = [];
  @observable public users: Map<string, User> = new Map();

  @action
  public async follow(followed: string) {
    const user = await axios.post<Follower>(
      `http://localhost:8080/accounts/${followed}/follow`
    );

    runInAction(() => {
      this.followerList.push(user.data);
    });
  }

  @action
  public async getFollowersList() {
    const followerList = await axios.get<Follower[]>(
      `http://localhost:8080/accounts/followers-list`
    );

    runInAction(() => {
      this.followerList = followerList.data;
    });
  }

  @action
  public async getFollowing() {
    const following = await axios.get<Follower[]>(
      `http://localhost:8080/accounts/${kc.subject}/following`
    );

    runInAction(() => {
      following.data.forEach(follower =>
        this.following.push(follower.followed)
      );
    });
  }

  @action
  public async getUsers() {
    const users = await axios.get<User[]>(`http://localhost:8080/accounts`);

    runInAction(() => {
      users.data.forEach(user => this.users.set(user.id, user));
    });
  }

  @action
  public async unfollow(follower: string, followed: string) {
    await axios.post(`http://localhost:8080/accounts/${followed}/unfollow`);

    runInAction(() => {
      this.followerList = this.followerList.filter(
        following =>
          following.follower !== follower && following.followed !== followed
      );
    });
  }
}

export const userStore = new UserStore();
