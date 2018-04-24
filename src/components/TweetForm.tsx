import axios from "axios";
import * as React from "react";

type Props = any;

interface State {
  characterLimit: number | null;
  content: string;
}

export class TweetForm extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      characterLimit: null,
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
      <form>
        <textarea
          onInput={this.onInput}
          placeholder="What's on your mind today?"
          value={content}
        />

        <div>
          <span>
            {!characterLimit ? "..." : characterLimit - content.length}
          </span>
          <button type="button" onClick={this.onSubmit}>
            Tweet
          </button>
        </div>
      </form>
    );
  }

  public onInput = (event: any) => {
    this.setState({ content: event.target.value });
  };

  public onSubmit = () => {
    axios
      .post("http://localhost:8080/tweets", this.state)
      .then(response => this.setState({ content: "" }));
  };
}
