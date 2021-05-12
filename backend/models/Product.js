const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const productSchema = new mongoose.Schema({
    fileName:{
        type: String,
        required: true
    },
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
    productCategory: {
        type: ObjectId,
        ref:'Category',
        required: true
    },
    },{timestamp: true}
);

const Product = mongoose.model('product', productSchema );

module.exports = Product;