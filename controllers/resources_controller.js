
//Here we return all general styles, client side scripts and downloadable resources


const express = require('express');
const router = express.Router();
const path = require('path')

router.get('/style', (req, res)=>{
    res.sendFile(path.join(__dirname, '../views/css/style.css'))
})
router.get('/script', (req, res)=>{
    res.sendFile(path.join(__dirname, '../views/frontend_js/logic.js'))
})
router.get('/img/:name', (req, res)=>{
    res.sendFile(path.join(__dirname, '../views/images/', req.params.name))
})

module.exports = router