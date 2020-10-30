var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ItemSchema = new Schema({
  name: String,
  category: String,
  description: String,
  product_id: Number,
  item_image: { type: String, default: null },
});

module.exports = mongoose.model("Item", ItemSchema);
