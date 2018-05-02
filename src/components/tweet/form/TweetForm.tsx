import axios from "axios";
import * as React from "react";
import { TweetStore } from "../../../state/Tweet";
import { ActionBar } from "./action-bar/ActionBar";

import "./styles.css";

interface Props {
  store: TweetStore;
}

interface State {
  characterLimit?: number;
  content: string;
}

export class TweetForm extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      content: ""
    };
  }

  public componentDidMount() {
    axios
      .get("http://localhost:8080/tweets/character-limit")
      .then(response => this.setState({ characterLimit: response.data }));
  }

  public render() {
    const { characterLimit, content } = this.state;
    return (
      <form className="tweet__form">
        <textarea
          onInput={this.onInput}
          placeholder="What's on your mind today?"
          value={content}
        />

        <ActionBar
          characterLimit={characterLimit && characterLimit - content.length}
          onSubmit={this.onSubmit}
        />
      </form>
    );
  }

  public onInput = (event: any) => {
    this.setState({ content: event.target.value });
  };

  public onSubmit = () => {
    this.props.store.postTweet(this.state.content);
  };
}
