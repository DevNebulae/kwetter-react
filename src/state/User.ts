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
  @observable public followerList: Set<Follower> = new Set();
  @observable public following: Set<string> = new Set();
  @observable public users: Map<string, User> = new Map();

  @action
  public async follow(followed: string) {
    const user = await axios.post<Follower>(
      `http://localhost:8080/accounts/${followed}/follow`
    );

    runInAction(() => {
      this.following.add(user.data.followed);
      // tslint:disable-next-line
      console.log(this.following);
    });
  }

  @action
  public async getFollowersList() {
    const followerList = await axios.get<Follower[]>(
      `http://localhost:8080/accounts/followers-list`
    );

    runInAction(() => {
      this.followerList = new Set(followerList.data);
    });
  }

  @action
  public async getFollowing() {
    const following = await axios.get<Follower[]>(
      `http://localhost:8080/accounts/${kc.subject}/following`
    );

    runInAction(() => {
      following.data.forEach(follower => this.following.add(follower.followed));
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
  public async unfollow(followed: string) {
    await axios.post(`http://localhost:8080/accounts/${followed}/unfollow`);

    runInAction(() => {
      this.following.delete(followed);
      // tslint:disable-next-line
      console.log(this.following);
    });
  }
}

export const userStore = new UserStore();
