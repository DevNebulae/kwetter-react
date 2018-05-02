import axios from "axios";
import { action, observable, runInAction } from "mobx";

// import axios from "axios";
// import { action } from "mobx";

interface Follower {
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
  @observable public following: Set<string> = new Set();
  @observable public users: Map<string, User> = new Map();

  @action
  public async follow(followed: string) {
    const user = await axios.post<Follower>(
      `http://localhost:8080/accounts/${followed}/follow`
    );

    runInAction(() => {
      this.following.add(user.data.followed);
    });
  }

  @action
  public async getUsers() {
    const users = await axios.get<User[]>(`http://localhost:8080/accounts`);

    runInAction(() => {
      users.data.forEach(user => this.users.set(user.id, user));
    });
  }
}

export const userStore = new UserStore();
