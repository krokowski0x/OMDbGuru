const { ObjectID } = require("mongodb");
const jwt = require("jsonwebtoken");

const { Movie } = require("./../server/models/Movie");
const { Comment } = require("./../server/models/Comment");
const { User } = require("./../server/models/User");

const userOneId = new ObjectID();
const userTwoId = new ObjectID();

const movies = [
  {
    _id: "5b99305d8598f4d3850f9104",
    title: "Guardians",
    movie: {
      Title: "Guardians",
      Year: "2009",
      Rated: "NOT RATED",
      Released: "24 Jun 2009",
      Runtime: "87 min",
      Genre: "Horror, Sci-Fi",
      Director: "Drew Maxwell",
      Writer: "Drew Maxwell",
      Actors: "Chris Bell, Benjamin Budd, Tylan Canady, Eric Cherney",
      Plot:
        "Twilight Cove, a small forgotten town, is besieged by hideous creatures summoned into our dimension. It's only a matter of time before the army of creatures attacks the rest of civilization...",
      Language: "English",
      Country: "USA",
      Awards: "N/A",
      Poster:
        "https://images-na.ssl-images-amazon.com/images/M/MV5BMTgwOTg0NTA0Nl5BMl5BanBnXkFtZTcwNTg3NTY3MQ@@._V1_SX300.jpg",
      Ratings: [
        {
          Source: "Internet Movie Database",
          Value: "2.9/10"
        }
      ],
      Metascore: "N/A",
      imdbRating: "2.9",
      imdbVotes: "206",
      imdbID: "tt0486592",
      Type: "movie",
      DVD: "15 Jul 2008",
      BoxOffice: "N/A",
      Production: "N/A",
      Website: "N/A",
      Response: "True"
    },
    id: "tt0486592",
    creator: userOneId,
    __v: 0
  },
  {
    _id: "5b9931ac57a2383041d216d9",
    title: "Guardians of the Galaxy",
    movie: {
      Title: "Guardians of the Galaxy",
      Year: "2014",
      Rated: "PG-13",
      Released: "01 Aug 2014",
      Runtime: "121 min",
      Genre: "Action, Adventure, Sci-Fi",
      Director: "James Gunn",
      Writer:
        "James Gunn, Nicole Perlman, Dan Abnett (based on the Marvel comics by), Andy Lanning (based on the Marvel comics by), Bill Mantlo (character created by: Rocket Raccoon), Keith Giffen (character created by: Rocket Raccoon), Jim Starlin (characters created by: Drax the Destroyer,  Gamora & Thanos), Steve Englehart (character created by: Star-Lord), Steve Gan (character created by: Star-Lord), Steve Gerber (character created by: Howard the Duck), Val Mayerik (character created by: Howard the Duck)",
      Actors: "Chris Pratt, Zoe Saldana, Dave Bautista, Vin Diesel",
      Plot:
        "A group of intergalactic criminals are forced to work together to stop a fanatical warrior from taking control of the universe.",
      Language: "English",
      Country: "USA",
      Awards: "Nominated for 2 Oscars. Another 52 wins & 99 nominations.",
      Poster:
        "https://m.media-amazon.com/images/M/MV5BMTAwMjU5OTgxNjZeQTJeQWpwZ15BbWU4MDUxNDYxODEx._V1_SX300.jpg",
      Ratings: [
        {
          Source: "Internet Movie Database",
          Value: "8.1/10"
        },
        {
          Source: "Rotten Tomatoes",
          Value: "91%"
        },
        {
          Source: "Metacritic",
          Value: "76/100"
        }
      ],
      Metascore: "76",
      imdbRating: "8.1",
      imdbVotes: "862,056",
      imdbID: "tt2015381",
      Type: "movie",
      DVD: "09 Dec 2014",
      BoxOffice: "&pound;270,592,504",
      Production: "Walt Disney Pictures",
      Website: "http://marvel.com/guardians",
      Response: "True"
    },
    id: "tt2015381",
    creator: userTwoId,
    __v: 0
  }
];

const comments = [
  {
    createdAt: "2018-09-12T17:12:18.107Z",
    _id: "5b9948f2fcb585b410012728",
    id: "tt2015381",
    comment: "Hello",
    __v: 0
  },
  {
    createdAt: "2018-09-12T17:12:51.088Z",
    _id: "5b994913fcb585b410012729",
    id: "tt0486592",
    comment: "What up",
    __v: 0
  }
];

const users = [
  {
    _id: userOneId,
    username: "andrew1",
    password: "userOnePass",
    tokens: [
      {
        access: "auth",
        token: jwt.sign({ _id: userOneId, access: "auth" }, "abc123").toString()
      }
    ]
  },
  {
    _id: userTwoId,
    username: "anotherOne",
    password: "userTwoPass",
    tokens: [
      {
        access: "auth",
        token: jwt.sign({ _id: userTwoId, access: "auth" }, "abc123").toString()
      }
    ]
  }
];

const addMovies = done => {
  Movie.deleteMany({})
    .then(() => Movie.insertMany(movies))
    .then(() => done());
};

const addComments = done => {
  Comment.deleteMany({})
    .then(() => Comment.insertMany(comments))
    .then(() => done());
};

const addUsers = done => {
  User.deleteMany({})
    .then(() => {
      const userOne = new User(users[0]).save();
      const userTwo = new User(users[1]).save();

      return Promise.all([userOne, userTwo]);
    })
    .then(() => done());
};

module.exports = { movies, comments, users, addMovies, addComments, addUsers };
