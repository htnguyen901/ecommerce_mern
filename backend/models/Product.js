const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    description:{
        type:String,
        requried:true
    },
    price:{
        type:Number,
        required:true
    },
    countInStock:{
        type:Number,
        required:true
    },
    imageUrl:{
        type:String,
        required:true
    }
})

const Prodcut = mongoose.model('product', productSchema );

module.exports = Prodcut;