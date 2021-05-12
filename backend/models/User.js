const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required: true
    },
    email:{
        type:String,
        requried:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:Number,
        default: 0
    }
}, {timestamps: true}
);


const User = mongoose.model('users', userSchema );

module.exports = User;