const express = require("express");
const fetch = require("node-fetch");
const bodyParser = require("body-parser");

const { mongoose } = require("./db/mongoose");
const { Movie } = require("./models/Movie");

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

app.get("/movies", (req, res) => {});

app.post("/comments", (req, res) => {});

app.post("/comments", (req, res) => {});

app.listen(PORT, () =>
  console.info(`Sort Test app is running on port ${PORT}!`)
);
