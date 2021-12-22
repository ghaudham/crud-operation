const mongoose = require('mongoose')
const Schema = mongoose.Schema
const cardProductSchema = new Schema({
    name:String,
    price:Number,
    description:String,
    quantity:Number,
    vendor:String,
      customer:String
})

var cardProduct  = mongoose.model('cardProducts',cardProductSchema)
module.exports = {cardProduct}
