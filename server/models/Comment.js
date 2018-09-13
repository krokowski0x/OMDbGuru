const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Comment = mongoose.model("Comment", {
  id: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  comment: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  createdAt: {
    type: Date,
    default: null
  },
  creator: {
    type: Schema.Types.ObjectId,
    required: true
  }
});

module.exports = { Comment };
