
//Here we return all general styles, client side scripts and downloadable resources


const express = require('express');
const router = express.Router();
const path = require('path')

//Styles
router.get('/style/:name', (req, res)=>{
    res.sendFile(path.join(__dirname, '../views/css/', req.params.name))
})

//Scripts
router.get('/script/:name', (req, res)=>{
    res.sendFile(path.join(__dirname, '../views/frontend_js/', req.params.name))
})

//Files
router.get('/img/:name', (req, res)=>{
    res.sendFile(path.join(__dirname, '../views/images/', req.params.name))
})

module.exports = router