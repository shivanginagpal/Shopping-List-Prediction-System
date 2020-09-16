const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ListSchema = new Schema({
  listName: {
    type: String,
    required: true,
  },
  listType: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  item: [
    {
      itemName: {
        type: String,
        required: true,
      },
      brandName: {
        type: String,
      },
      store: {
        type: String,
      },
      price: {
        type: Number,
      },
      quantity: {
        type: Number,
        default: 1,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

var List = mongoose.model("list", ListSchema);
exports.List = List;
exports.ListSchema = ListSchema;
