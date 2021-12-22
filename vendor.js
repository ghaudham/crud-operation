const mongoose = require('mongoose')
const Schema = mongoose.Schema
const vendorSchema = new Schema({
    name:String,
    phoneNumber:Number,
    password:String,
    
})

var vendor  = mongoose.model('vendors',vendorSchema)
module.exports = {vendor}
