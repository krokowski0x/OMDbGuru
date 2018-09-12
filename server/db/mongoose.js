const mongoose = require("mongoose");

mongoose.set("useCreateIndex", true);
mongoose.Promise = global.Promise;
mongoose.connect(
  "mongodb://localhost:27017/Movies" || process.env.MONGODB_URI,
  { useNewUrlParser: true }
);

module.exports = { mongoose };
