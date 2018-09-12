const express = require("express");
const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.static("dist"));

app.post("/movies", (req, res) => {});

app.get("/movies", (req, res) => {});

app.post("/comments", (req, res) => {});

app.post("/comments", (req, res) => {});

app.listen(PORT, () =>
  console.info(`Sort Test app is running on port ${PORT}!`)
);
