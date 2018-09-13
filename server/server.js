const path = require("path");
const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");
const bodyParser = require("body-parser");
const { ObjectID } = require("mongodb");

// Mongoose models
const { mongoose } = require("./db/mongoose");
const { Movie } = require("./models/Movie");
const { Comment } = require("./models/Comment");
const { User } = require("./models/User");
const { authenticate } = require("./middleware/authenticate");

// Global constants (API_URL and PORT)
require("./config/config");
const API_URL = "http://www.omdbapi.com/?";

const app = express();

// Express middlewares
app.use("/", express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());
app.use(cors());

// ROUTES
app.post("/movies", authenticate, async (req, res) => {
  // Pull out title from the request
  const title = req.body.title;
  // Check if there is a movie with given title in DB
  const movie = await Movie.find({ title });
  // If true, just return 200
  if (movie.length) return res.status(200).send();

  try {
    // Get the movie by title form OMDb API
    const result = await fetch(
      `${API_URL}t=${title}&apikey=${process.env.API_KEY}`
    ).then(response => response.json());
    // Create and validate Movie document
    const movie = new Movie({
      title,
      movie: result,
      id: result.imdbID,
      creator: req.user._id
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

app.get("/movies", authenticate, async (req, res) => {
  try {
    // Try to get all movies that belong to this user from DB
    const movies = await Movie.find({ creator: req.user._id });
    // Send it back as a response
    res.send({ movies });
  } catch (err) {
    // 400 - Bad Request
    res.status(400).send(err);
  }
});

app.delete("/movies/:id", authenticate, async (req, res) => {
  try {
    // Try to get that movie from DB
    const movie = await Movie.findOneAndDelete({
      id: req.params.id,
      creator: req.user._id
    });
    // Send it back as a response
    res.send(movie);
  } catch (err) {
    // 400 - Bad Request
    res.status(400).send(err);
  }
});

app.post("/comments", authenticate, async (req, res) => {
  // Pull out id from the request
  const id = req.body.id;
  // Check if there is a movie with given id
  const movie = await Movie.findOne({ id });
  // If not send 404 - Not Found
  if (!movie) return res.status(404).send();

  try {
    // Create and validate Comment document
    const comment = new Comment({
      id,
      comment: req.body.comment,
      createdAt: new Date(),
      creator: req.user._id
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
  if (!comments.length) return res.status(404).send();

  try {
    // Send it back as a response
    res.send({ comments });
  } catch (err) {
    // 400 - Bad Request
    res.status(400).send(err);
  }
});

app.delete("/comments/:id", authenticate, async (req, res) => {
  // Pull out id from the request
  const id = req.params.id;

  try {
    // Check if there is a comment with given id
    const comment = await Comment.findOneAndDelete({
      _id: id,
      creator: req.user._id
    });
    // If not send 404 - Not Found
    if (!comment) return res.status(404).send();
    // Send it back as a response
    res.send(comment);
  } catch (err) {
    // 400 - Bad Request
    res.status(400).send(err);
  }
});

app.post("/users", async (req, res) => {
  try {
    // Pull out user data from the request
    const user = new User({
      username: req.body.username,
      password: req.body.password
    });
    // Save him to database
    await user.save();
    // Sign a JWT and push it to the tokens array
    const token = await user.generateAuthToken();
    // Authenticate response via header and send it back
    res.header("x-auth", token).send(user);
  } catch (err) {
    // 400 - Bad Request
    res.status(400).send(err);
  }
});

app.get("/users/me", authenticate, (req, res) => {
  // Just get the user (rest is in the middleware)
  res.send(req.user);
});

app.post("/users/login", async (req, res) => {
  try {
    // Pull out user data from the request and get this user from DB
    const user = await User.findByCredentials(
      req.body.username,
      req.body.password
    );
    // Sign a JWT and push it to the tokens array
    const token = await user.generateAuthToken();
    // Authenticate response via header and send it back
    res.header("x-auth", token).send(user);
  } catch (err) {
    // 400 - Bad Request
    res.status(400).send(err);
  }
});

app.delete("/users/me/token", authenticate, async (req, res) => {
  try {
    // Remove yourself from the DB (log out)
    await req.user.removeToken(req.token);
    // Say that it went well
    res.status(200).send();
  } catch (e) {
    // 400 - Bad Request
    res.status(400).send();
  }
});

app.listen(process.env.PORT, () =>
  console.info(`Sort Test app is running on port ${process.env.PORT}!`)
);

module.exports = app;
