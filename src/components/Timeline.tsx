import axios from "axios";
import * as React from "react";

interface Tweet {
  id: number;
  author: string;
  content: string;
  postedAt: {
    epochSecond: number;
    nano: number;
  };
}

interface State {
  tweets: Tweet[];
}

export class Timeline extends React.Component<{}, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      tweets: []
    };
  }

  public componentDidMount() {
    axios
      .get("http://localhost:8080/tweets/timeline")
      .then(tweets => this.setState({ tweets: tweets.data }));
  }

  public render() {
    const { tweets } = this.state;

    return (
      <section>
        {tweets.map(({ id, author, postedAt, content }) => (
          <article key={id}>
            <header>
              <span>{author}</span> -{" "}
              <span>
                {new Date(postedAt.epochSecond * 1000).toDateString()}
              </span>
            </header>

            <main>{content}</main>
          </article>
        ))}
      </section>
    );
  }
}
