import React, { Component } from "react";

export default class MovieList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      movies: []
    };
  }

  componentDidMount() {
    fetch("/movies")
      .then(res => res.json())
      .then(result => this.setState({ movies: result.movies }));
  }

  render() {
    const { movies } = this.state;

    if (movies)
      return (
        <div>
          <h2>Your Movies:</h2>
          <ul>
            {movies.map(movie => (
              <li>{movie.title}</li>
            ))}
          </ul>
        </div>
      );
    else return <div />;
  }
}
