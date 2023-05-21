const mongoose = require("mongoose");
const ratingSchema = require("./rating");

const productSchema = mongoose.Schema({
_id: mongoose.Schema.Types.ObjectId,

name: {
    type: String,
    required: true,
    trim: true,
},

description: {
    type: String,
    required: true,
    trim: true,
},

images: [
    {
      type: String,
      required: true,
    },
],

quantity: {
    type: Number,
    required: true,
},

price: {
    type: Number,
    required: true,
},
  
category: {
    type: String,
    required: true,
},

created_at: {
		type: Date,
		default: Date.now,
},
  ratings: [ratingSchema],
});

const Product = mongoose.model("Product", productSchema);
module.exports = { Product, productSchema };