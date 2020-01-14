const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullName:{
        type: String
    },
    email:{
        type: String
    },
    mobile:{
        type: String
    },
    city:{
        type: String
    },
    password:{
        type: String
    },
    token:{
        type: String
    },
})

mongoose.model('user', userSchema)