var mongoose = require('mongoose');
var Schema = mongoose.Schema

var ItemSchema = new Schema({
    name :String,
    category:String,
    description:String,
    product_id:Number,

});

module.exports = mongoose.model('Item',ItemSchema)