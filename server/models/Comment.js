const mongoose = require("mongoose");

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
  }
});

module.exports = { Comment };
