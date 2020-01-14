const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
    name:{
        type:String
    },
    owner:{
        type:String,
        required:'owner not found'
    },
    price:{
        type:String
    },
    code:{
        type:String,
        required:'Code is needed',
        unique:'That code already exists'
    },
});

mongoose.model('property', propertySchema)
