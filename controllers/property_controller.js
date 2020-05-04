
const mongoose = require('mongoose');
const propertyModel = mongoose.model('property');
const userModel = mongoose.model('user');
const express = require('express');
const router = express.Router();
const url = require('url');


let productList = [];
let owner = {};
router.get('/', (req, res)=>{
    if(req.cookies.token){
        userModel.findOne({"token":req.cookies.token}, (err, doc)=>{
            if(!err){
                console.log(doc)
                if(!doc){
                    res.clearCookie('token') .render('loggedout.ejs');
                    console.log('Expired')
                    return
                }
                propertyModel.find({"owner":doc.fullName}, (errors, data)=>{
                    if(!errors){
                        console.log(url.parse(req.url))
                        res.render('properties.ejs',{
                            activeList:data, 
                            imUrl:[], 
                            requestParam:req.query.fullname,
                            user:doc, 
                            success:'',
                            failure:''
                        });
                    }else{
                        console.log(errors)
                    }
                })
            }else{
                console.log('A big error occoured')
                console.log(err);
            }
        });
        
    }else{
        res.redirect('/login')
    }
    
})
router.post('/add', (req, res)=>{
    const propertyCollection = new propertyModel();
    propertyCollection.name = req.body.name;
    propertyCollection.owner = req.body.owner;
    propertyCollection.price = req.body.price;
    propertyCollection.code = new Date().getTime().toString();
    propertyCollection.save((err)=>{
        if(!err){
            console.log('saved')
            setTimeout(()=>{
                res.redirect('/properties')
            },100)
        }else{
            let errorContent = {};
            if(err.name == 'ValidationError'){
                errorContent.msg = 'The item could not be added'
                console.log(errorContent)
                for( let values in err.errors){
                    switch(err.errors[values].path){
                        case'name': errorContent.nameError = err.errors[values].message
                        console.log(errorContent)
                        break
                        case'owner': errorContent.ownerError = err.errors[values].message
                        console.log(errorContent)
                        break
                        case'price': errorContent.priceError = err.errors[values].message
                        console.log(errorContent)
                        break
                        case'code': errorContent.codeError = err.errors[values].message
                        console.log(errorContent)
                        break
                    }
                }
            }else{
                console.log('Something un usual occoured')
            }
            res.render('properties.ejs',{
                activeList:[], 
                imUrl:[], 
                user:'', 
                success:'',
                failure:errorContent || {message:'Entry failed'}
            });
        }
    })
})
//
router.get('/delete/:id', (req, res)=>{
    propertyModel.findByIdAndDelete(req.params.id, (err, doc)=>{
        if(!err){
            setTimeout(()=>{
                res.redirect('/properties')
            },100)
        }else{
            console.log(err)
        }
    })
})


module.exports = router