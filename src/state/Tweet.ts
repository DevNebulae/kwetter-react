import axios from "axios";
import { action, observable, runInAction } from "mobx";

export interface Tweet {
  author: string;
  content: string;
  id: number;
  likes: string[];
  postedAt: {
    epochSecond: number;
    nano: number;
  };
}

export class TweetStore {
  @observable public tweets: Tweet[] = [];

  @action
  public async getTweets() {
    const tweets = await axios.get<Tweet[]>(
      "http://localhost:8080/tweets/timeline"
    );

    runInAction(() => {
      this.tweets = tweets.data;
    });
  }

  @action
  public async postTweet(content: string) {
    const tweet = await axios.post<Tweet>("http://localhost:8080/tweets", {
      content
    });

    runInAction(() => {
      this.tweets.push(tweet.data);
    });
  }
}

export const tweetStore = new TweetStore();
