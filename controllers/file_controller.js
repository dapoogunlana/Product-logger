
const express = require('express');
const router = express.Router();
const dummyData = require('./../dummy_data');
const path = require('path')



router.get('/xlsx', (req, res)=>{
    res.sendFile(path.join(__dirname, '../files/report.xlsx'))
})
router.get('/pdf', (req, res)=>{
    res.sendFile(path.join(__dirname, '../files/report.pdf'))
})
router.get('/csv', (req, res)=>{
    res.sendFile(path.join(__dirname, '../files/report.csv'))
})

module.exports = router