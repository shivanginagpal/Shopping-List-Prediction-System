const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ListSchema = new Schema({

    listName: {
        type:String,
        required:true
    },
    date: {
        type: Date,
        default: Date.now
    },
    item: [{
        itemName: {
            type: String,
            required: true,
        },
        quantity: {
            type: Number,
            default: 1
        }
    }]
})

var List = mongoose.model("list", ListSchema);
exports.List = List;
exports.ListSchema = ListSchema;
