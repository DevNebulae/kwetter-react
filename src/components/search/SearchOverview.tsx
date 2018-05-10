import axios from "axios";
import * as React from "react";
import { Tweet, tweetStore } from "../../state/Tweet";
import { userStore } from "../../state/User";
import { TweetComponent } from "../tweet/Tweet";

import "./styles.css";

export interface Page<T> {
  content: T[];
  first: boolean;
  last: boolean;
  number: number;
  numberOfElements: number;
  size: number;
  sort?: string;
  totalElements: number;
  totalPages: number;
}

interface State {
  currentPage?: Page<Tweet>;
  currentPageIndex: number;
  query: string;
}

export class SearchOverview extends React.Component<{}, State> {
  constructor(props: any) {
    super(props);

    this.state = {
      currentPageIndex: 0,
      query: ""
    };
  }

  public render() {
    const { currentPage, currentPageIndex, query } = this.state;

    return (
      <div className="search__wrapper">
        <form className="search__input">
          <input onInput={this.onInput} value={query} />
          <button onClick={this.onQuery()} type="button">
            Search
          </button>
        </form>

        <main>
          {currentPage &&
            currentPage.content.map((tweet, index) => (
              <TweetComponent
                key={tweet.id}
                tweet={tweet}
                tweetStore={tweetStore}
                userStore={userStore}
              />
            ))}

          {currentPage &&
            Array.from(Array(currentPage.totalPages).keys()).map(pageNumber => {
              const isSelected = pageNumber === currentPageIndex;

              return (
                <a
                  key={pageNumber}
                  href={isSelected ? undefined : "javascript:void"}
                  onClick={
                    isSelected ? undefined : this.onPageSwitch(pageNumber)
                  }
                >
                  {pageNumber + 1}
                </a>
              );
            })}
        </main>
      </div>
    );
  }

  private onInput = (e: React.FormEvent<HTMLInputElement>) => {
    this.setState({
      query: e.currentTarget.value
    });
  };

  private onPageSwitch = (index: number) => async (
    e: React.FormEvent<HTMLAnchorElement>
  ) => {
    e.preventDefault();

    axios
      .get<Page<Tweet>>(
        `http://localhost:8080/tweets/query?content=${
          this.state.query
        }&page=${index}`
      )
      .then(response => response.data)
      .then(data => {
        // tslint:disable-next-line
        console.log(data);
        this.setState({ currentPage: data, currentPageIndex: index });
      });
  };

  private onQuery = (page: number = 0) => async () => {
    this.setState({ currentPageIndex: page });

    axios
      .get<Page<Tweet>>(
        `http://localhost:8080/tweets/query?content=${
          this.state.query
        }&page=${page}`
      )
      .then(response => response.data)
      .then(data => {
        this.setState({ currentPage: data });
      });
  };
}
