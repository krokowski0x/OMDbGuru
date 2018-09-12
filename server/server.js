const express = require("express");
const fetch = require("node-fetch");
const bodyParser = require("body-parser");

const { mongoose } = require("./db/mongoose");
const { Movie } = require("./models/Movie");
const { Comment } = require("./models/Comment");

const API_KEY = require("./APIKey");
const API_URL = "http://www.omdbapi.com/?";
const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.static("dist"));
app.use(bodyParser.json());

app.post("/movies", async (req, res) => {
  const title = req.body.title;

  try {
    const result = await fetch(`${API_URL}t=${title}&apikey=${API_KEY}`).then(
      response => response.json()
    );

    const movie = new Movie({
      title,
      movie: result
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

app.post("/comments", async (req, res) => {});

app.get("/comments", async (req, res) => {
  try {
    const comments = await Comment.find();
    res.send({ comments });
  } catch (err) {
    res.status(400).send(err);
  }
});

app.listen(PORT, () =>
  console.info(`Sort Test app is running on port ${PORT}!`)
);
