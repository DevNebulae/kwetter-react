import axios from "axios";

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

class UserStore {
  public followed: Set<string> = new Set();
  public users: Map<string, User> = new Map();

  public async follow(followed: string) {
    const user = await axios.post(
      `http://localhost:8080/accounts/${followed}/follow`
    );
  }
}

export const userStore = UserStore;
