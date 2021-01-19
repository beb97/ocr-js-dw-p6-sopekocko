const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');


userSchema.plugin(uniqueValidator);

const sauceSchema = mongoose.Schema({
  _id: { type: String, required: true },
  name: { type: String, required: true, unique: true },
  manufacturer: { type: String, required: true },
  description: { type: String, required: true },
  mainPepper: { type: String, required: true },
  heat: { type: Number, required: true },
  likes: { type: Number, required: true },
  dislikes: { type: Number, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  usersLiked: { type: [String], required: true },
  usersDisliked: { type: [String], required: true }

});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Sauce', sauceSchema);