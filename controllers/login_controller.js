
const mongoose = require('mongoose');
const propertyModel = mongoose.model('property')
const userModel = mongoose.model('user')
const express = require('express');
const router = express.Router();//


let productList = [];
router.get('/', (req, res)=>{
    if(req.cookies.token){
        res.redirect('/properties')
        return
    }
    userModel.find({}, (err, doc)=>{
        if(!err){
            productList = doc;
            console.log('User list loaded');
            res.render('login.ejs',{
                activeList:productList, 
                imUrl:[], 
                user:'', 
                success:'',
                failure:''
            });
        }else{
            console.log(err)
        }
    })
    
})
router.post('/', (req, res)=>{
    userModel.findOneAndUpdate({ 'email':req.body.email, 'password':req.body.password }, 
    { 'token': Math.round(Math.random() * 100000000000000000000) + new Date().getTime().toString() }, 
    { new:true, useFindAndModify:false }, (err, doc)=>{
        if(!err){
            productList = doc;
            console.log(doc)
            // res.render('login.ejs',{
            //     activeList:productList, 
            //     imUrl:[], 
            //     user:'', 
            //     success:'',
            //     failure:''
            // });
            if(doc){
                res.send(doc)
            }else{
                res.status(400).send({errorMessage:'Invalid email or password'})
            }
        }else{
            console.log(err)
        }
    })
    
})

router.post('/2', (req, res)=>{
    userModel.findOneAndUpdate({ 'email':req.body.email, 'password':req.body.password }, 
    { 'token': Math.round(Math.random() * 100000000000000000000) + new Date().getTime().toString() }, 
    { new:true, useFindAndModify:false }, (err, doc)=>{
        if(!err){
            productList = doc;
            console.log(doc)
            
            if(doc){
                res.cookie('token', doc.token).redirect('/properties')
            }else{
                res.render('login.ejs',{
                    activeList:productList, 
                    imUrl:[], 
                    user:'', 
                    success:'',
                    failure:'Invalid email or password'
                });
            }
        }else{
            console.log(err)
        }
    })
    
})
router.get('/logout', (req, res)=>{
    console.log('sorting')
    res.clearCookie('token').redirect('/login')
})

module.exports = router