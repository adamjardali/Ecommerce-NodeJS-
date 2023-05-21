const mongoose = require("mongoose");

const ratingSchema = mongoose.Schema({
  user_id: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
});

module.exports = ratingSchema;