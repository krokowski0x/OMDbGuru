const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");
const bodyParser = require("body-parser");

// Mongoose models
const { mongoose } = require("./db/mongoose");
const { Movie } = require("./models/Movie");
const { Comment } = require("./models/Comment");

// Global constants
const API_KEY = require("./APIKey");
const API_URL = "http://www.omdbapi.com/?";
const PORT = process.env.PORT || 3000;

const app = express();

// Express middlewares
app.use(express.static("dist"));
app.use(bodyParser.json());
app.use(cors());

// ROUTES
app.post("/movies", async (req, res) => {
  const title = req.body.title;

  try {
    const result = await fetch(`${API_URL}t=${title}&apikey=${API_KEY}`).then(
      response => response.json()
    );

    const movie = new Movie({
      title,
      movie: result,
      id: result.imdbID
    });

    const document = await movie.save();

    res.send(document);
  } catch (err) {
    res.status(400).send(err);
  }
});

app.get("/movies", async (req, res) => {
  try {
    const movies = await Movie.find();
    res.send({ movies });
  } catch (err) {
    res.status(400).send(err);
  }
});

app.post("/comments", async (req, res) => {
  const id = req.body.id;
  const movie = await Movie.find({ id });
  if (!movie.length) res.sendStatus(404);

  try {
    const comment = new Comment({
      id,
      comment: req.body.comment,
      createdAt: new Date()
    });

    const document = await comment.save();

    res.send(document);
  } catch (err) {
    res.status(400).send(err);
  }
});

app.get("/comments", async (req, res) => {
  try {
    const comments = await Comment.find();
    res.send({ comments });
  } catch (err) {
    res.status(400).send(err);
  }
});

app.get("/comments/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const comments = await Comment.find({ id });

    if (comments.length) res.send({ comments });
    else res.sendStatus(404);
  } catch (err) {
    res.status(400).send(err);
  }
});

app.listen(PORT, () =>
  console.info(`Sort Test app is running on port ${PORT}!`)
);

module.exports = app;
