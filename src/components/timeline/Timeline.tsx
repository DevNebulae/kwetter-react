import * as Stomp from "@stomp/stompjs";
import { observer } from "mobx-react";
import * as React from "react";
import styled from "react-emotion";
import * as SockJS from "sockjs-client";
import { kc } from "../..";
import { Tweet, TweetStore, tweetStore } from "../../state/Tweet";
import { userStore } from "../../state/User";
import { TweetComponent } from "../tweet/Tweet";

interface Props {
  store: TweetStore;
}

const TimelineWrapper = styled("main")`
  grid-column: 3 / span 8;
`;

@observer
export class Timeline extends React.Component<Props> {
  public componentDidMount() {
    const socket = new SockJS("http://localhost:8080/stomp");
    const stompClient = Stomp.over(socket);
    stompClient.connect({}, frame => {
      stompClient.subscribe("/timeline.addition", data => {
        const tweet = JSON.parse(data.body) as Tweet;

        if (tweet.author !== kc.subject) {
          this.props.store.addTweet(tweet);
        }
      });

      stompClient.subscribe("/timeline.deletion", data => {
        const id = JSON.parse(data.body) as number;

        this.props.store.deleteLocalTweet(id);
      });
      // tslint:disable-next-line
      console.log("Connected!");
    });
  }

  public render() {
    return (
      <TimelineWrapper>
        {this.props.store.tweets.map((tweet, index) => (
          <TweetComponent
            key={index}
            tweetStore={tweetStore}
            userStore={userStore}
            tweet={tweet}
          />
        ))}
      </TimelineWrapper>
    );
  }
}
