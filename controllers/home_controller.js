
const express = require('express');
const router = express.Router();


let dummyArray = [
    {name:"Indian", power:13},
    {name:"Chinese", power:10},
    {name:"Korean", power:9},
    {name:"Nigerian", power:15},
    {name:"Ghanian", power:7}
]
let imageUrls = [
    "http://dapo-ogunlana.com.ng/randoms/n1.jpg",
    "http://dapo-ogunlana.com.ng/randoms/n2.jpg",
    "http://dapo-ogunlana.com.ng/randoms/n3.jpg",
    "http://dapo-ogunlana.com.ng/randoms/n4.jpg",
    "http://dapo-ogunlana.com.ng/randoms/n5.jpg",
    "http://dapo-ogunlana.com.ng/randoms/n6.jpg",
]

router.get('/', (req, res)=>{
    res.render('index.ejs', {activeList:dummyArray, imUrl:imageUrls})
})

module.exports = router