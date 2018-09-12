const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Movie = mongoose.model("Movie", {
  title: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  movie: {
    type: Schema.Types.Mixed,
    required: true
  }
});

module.exports = { Movie };
