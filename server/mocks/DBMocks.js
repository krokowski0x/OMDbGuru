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
        token: jwt
          .sign({ _id: userOneId, access: "auth" }, process.env.JWT_SECRET)
          .toString()
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
        token: jwt
          .sign({ _id: userTwoId, access: "auth" }, process.env.JWT_SECRET)
          .toString()
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
