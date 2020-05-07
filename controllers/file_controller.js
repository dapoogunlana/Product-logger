
const express = require('express');
const router = express.Router();
const dummyData = require('./../dummy_data');
const path = require('path')



// router.get('/xlsx', (req, res)=>{
//     res.sendFile(path.join(__dirname, '../files/report.xlsx'))
// })
// router.get('/pdf', (req, res)=>{
//     res.sendFile(path.join(__dirname, '../files/report.pdf'))
// })
// router.get('/csv', (req, res)=>{
//     res.sendFile(path.join(__dirname, '../files/report.csv'))
// })

router.get('/:format/:state/:typeCode', (req, res)=>{
    if(req.params.format === 'csv'){
        if (req.params.state === 'all') {
            if (req.params.typeCode == '1') {
                res.sendFile(path.join(__dirname, '../files/general-inflow.csv'))
            } else if (req.params.typeCode == '2') {
                res.sendFile(path.join(__dirname, '../files/general-outflow.csv'))
            } else if (req.params.typeCode == '3') {
                res.sendFile(path.join(__dirname, '../files/general-report.csv'))
            }
        } else if (req.params.state === 'lagos') {
            if (req.params.typeCode == '1') {
                res.sendFile(path.join(__dirname, '../files/lagos-inflow.csv'))
            } else if (req.params.typeCode == '2') {
                res.sendFile(path.join(__dirname, '../files/lagos-outflow.csv'))
            } else if (req.params.typeCode == '3') {
                res.sendFile(path.join(__dirname, '../files/lagos-report.csv'))
            }
        }
    } else if (req.params.format === 'pdf') {
        if (req.params.state === 'all') {
            if (req.params.typeCode == '1') {
                res.sendFile(path.join(__dirname, '../files/general-inflow.pdf'))
            } else if (req.params.typeCode == '2') {
                res.sendFile(path.join(__dirname, '../files/general-outflow.pdf'))
            } else if (req.params.typeCode == '3') {
                res.sendFile(path.join(__dirname, '../files/general-report.pdf'))
            }
        } else if (req.params.state === 'lagos') {
            if (req.params.typeCode == '1') {
                res.sendFile(path.join(__dirname, '../files/lagos-inflow.pdf'))
            } else if (req.params.typeCode == '2') {
                res.sendFile(path.join(__dirname, '../files/lagos-outflow.pdf'))
            } else if (req.params.typeCode == '3') {
                res.sendFile(path.join(__dirname, '../files/lagos-report.pdf'))
            }
        }
    }
})

module.exports = router