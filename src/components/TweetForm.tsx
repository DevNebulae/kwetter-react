import axios from "axios";
import * as React from "react";

type Props = any;

interface IState {
  characterLimit: number | null;
  content: string;
}

export class TweetForm extends React.Component<Props, IState> {
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
    return (
      <form>
        <textarea
          onInput={this.onInput}
          placeholder="What's on your mind today?"
          value={this.state.content}
        />

        <div>
          <span>{this.state.characterLimit}</span>
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
    axios.post("http://localhost:8080/tweets", this.state);
  };
}
