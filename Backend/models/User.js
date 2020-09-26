const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//var { ListSchema } = require("./List");

// Create Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  address: {
    type: String,
  },
  //,
  //lists: [ListSchema]
});

module.exports = User = mongoose.model("User", UserSchema);
