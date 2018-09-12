const express = require("express");
const fetch = require("node-fetch");
const _ = require("lodash");
const cors = require("cors");
const bodyParser = require("body-parser");

// Mongoose models
const { mongoose } = require("./db/mongoose");
const { Movie } = require("./models/Movie");
const { Comment } = require("./models/Comment");
const { User } = require("./models/User");
const { authenticate } = require("./middleware/authenticate");

// Global constants
const API_KEY = require("./APIKey");
const API_URL = "http://www.omdbapi.com/?";
const PORT = process.env.PORT || 3000;

const app = express();

// Express middlewares
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(cors());

// ROUTES
app.post("/movies", async (req, res) => {
  // Pull out title from the request
  const title = req.body.title;

  try {
    // Get the movie by title form OMDb API
    const result = await fetch(`${API_URL}t=${title}&apikey=${API_KEY}`).then(
      response => response.json()
    );
    // Create and validate Movie document
    const movie = new Movie({
      title,
      movie: result,
      id: result.imdbID
    });
    // Save it to database
    const document = await movie.save();
    // Send it back as a response
    res.send(document);
  } catch (err) {
    // 400 - Bad Request
    res.status(400).send(err);
  }
});

app.get("/movies", async (req, res) => {
  try {
    // Try to get all movies from DB
    const movies = await Movie.find();
    // Send it back as a response
    res.send({ movies });
  } catch (err) {
    // 400 - Bad Request
    res.status(400).send(err);
  }
});

app.post("/comments", async (req, res) => {
  // Pull out id from the request
  const id = req.body.id;
  // Check if there is a movie with given id
  const movie = await Movie.find({ id });
  // If not send 404 - Not Found
  if (!movie.length) res.sendStatus(404);

  try {
    // Create and validate Comment document
    const comment = new Comment({
      id,
      comment: req.body.comment,
      createdAt: new Date()
    });
    // Save it to database
    const document = await comment.save();
    // Send it back as a response
    res.send(document);
  } catch (err) {
    // 400 - Bad Request
    res.status(400).send(err);
  }
});

app.get("/comments", async (req, res) => {
  try {
    // Try to get all comments from DB
    const comments = await Comment.find();
    // Send it back as a response
    res.send({ comments });
  } catch (err) {
    // 400 - Bad Request
    res.status(400).send(err);
  }
});

app.get("/comments/:id", async (req, res) => {
  // Pull out id from the request
  const id = req.params.id;
  // Check if there is a comment with given id
  const comments = await Comment.find({ id });
  // If not send 404 - Not Found
  if (!comments.length) res.sendStatus(404);
  try {
    // Send it back as a response
    res.send({ comments });
  } catch (err) {
    // 400 - Bad Request
    res.status(400).send(err);
  }
});

app.post("/users", async (req, res) => {
  try {
    const user = new User({
      username: req.body.username,
      password: req.body.password
    });
    await user.save();
    const token = await user.generateAuthToken();
    res.header("x-auth", token).send(user);
  } catch (err) {
    res.status(400).send(err);
  }
});

app.get("/users/me", authenticate, (req, res) => {
  res.send(req.user);
});

app.listen(PORT, () =>
  console.info(`Sort Test app is running on port ${PORT}!`)
);

module.exports = app;
