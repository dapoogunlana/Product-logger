
const express = require('express');
const router = express.Router();
const dummyData = require('./../dummy_data');



router.get('/', (req, res)=>{
    res.render('index.ejs', {activeList:dummyData.countrymen, imUrl:dummyData.userImages})
})

module.exports = router