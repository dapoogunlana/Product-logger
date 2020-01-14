const express = require('express');
const client = require('../models/db');
const path = require('path');
const dbInterface = require('../models/db');
const mongoose = require('mongoose');
const userModel = mongoose.model('user')
const mongoClient = require('mongodb').MongoClient;
const mongoURL2 = 'mongodb://localhost:27017/hostingdb';

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
let user = 'Dapo'

router.get('/', (req, res)=>{
    if(req.cookies.token){
        res.redirect('/properties')
        return
    }
    console.log(dbInterface)
    mongoClient.connect(mongoURL2,{ useUnifiedTopology: true }, (err, client)=>{
        if(!err){
            console.log('Db Connected');
            const db = client.db('hostingdb');
            const users = db.collection('users').find()
            let newUsers = []
            new Promise((resolve, reject)=>{
                resolve(
                    users.forEach((user) =>{
                        newUsers.push(user);
                    })
                )
            })
            .then(()=>{
                console.log(newUsers)
                res.render('register.ejs',{
                    activeList:dummyArray, 
                    imUrl:imageUrls, 
                    user:user, 
                    employee:'',
                    success:'',
                    failure:''
                });
            })
        }else console.log('did not connect ' + err)
    });

});
router.get('/:id', (req, res)=>{
    if(req.cookies.token){
        res.redirect('/properties')
        return
    }
    mongoClient.connect(mongoURL2,{ useUnifiedTopology: true }, (err, client)=>{
        if(!err){
            console.log('Db Connected');
            const db = client.db('hostingdb');
            const users = db.collection('users').find({"email":req.params.id})
            let newUsers = []
            new Promise((resolve, reject)=>{
                resolve(
                    users.forEach((user) =>{
                        newUsers.push(user);
                    })
                )
            })
            .then(()=>{
                const newUser = newUsers[0];
                console.log(newUser)
                res.render('register.ejs',{
                    activeList:dummyArray, 
                    imUrl:imageUrls, 
                    user:user, 
                    user:newUser,
                    success:'',
                    failure:''
                });
            });
        }else console.log('did not connect ' + err)
    });

});
router.post('/', (req, res)=>{
    if(req.cookies.token){
        res.redirect('/properties')
        return
    }
    const input = req.body;
    console.log(input);
    const User = new userModel();
    userModel.find({"email":req.body.email}, (err, doc)=>{
        if(!err){
            if(doc.length == 0){                
                User.fullName = req.body.fullname;
                User.email = req.body.email;
                User.mobile = req.body.mobile;
                User.city = req.body.city;
                User.password = req.body.password;
                User.token = Math.round(Math.random() * 100000000000000000000) + new Date().getTime().toString();
                console.log(User.token);
                User.save((err, data)=>{
                    if(!err){
                        console.log('saved successfully');
                        res.render('register.ejs',{
                            activeList:dummyArray, 
                            imUrl:imageUrls, 
                            user:user, 
                            employee:'',
                            success:'Saved Successfully',
                            failure:''
                        });
                    }else{
                        console.log(err);
                        res.render('register.ejs',{
                            activeList:dummyArray, 
                            imUrl:imageUrls, 
                            user:user, 
                            employee:'',
                            success:'',
                            failure:'Error while saving'
                        });
                    }
                })
            }else{
                console.log('Email already Exists');
                res.render('register.ejs',{
                    activeList:dummyArray, 
                    imUrl:imageUrls, 
                    user:user, 
                    employee:'',
                    success:'',
                    failure:'Email already Exists'
                })
            }
        }else{
            console.log(err)
            res.render('register.ejs',{
                activeList:dummyArray, 
                imUrl:imageUrls, 
                user:user, 
                employee:'',
                success:'',
                failure:'Unable to save'
            })
        }
    })


    // mongoClient.connect(mongoURL2,{ useUnifiedTopology: true }, (err, client)=>{
    //     if(!err){
    //         console.log('Db Connected');
    //         const db = client.db('hostingdb');
    //         let verifier = [];
    //         const usersVerification = db.collection('users').find({"email":req.body.email})
    //         new Promise((resolve, reject)=>{
    //             resolve(
    //                 usersVerification.forEach((user) =>{
    //                     verifier.push(user);
    //                 })
    //             )
    //         })
    //         .then(()=>{
    //             console.log(verifier)
    //             if(verifier.length == 0){
    //                 const users = db.collection('users').insertOne(input)
    //                 .then(()=>{
    //                     console.log('sucessfully written')
    //                 })
    //                 .catch(err=>{
    //                     console.log(err)
    //                 })
    //             }else{
    //                 console.log('email already exists')
    //             }
    //         })
                
    //     }else console.log('did not connect ' + err)
    // })
});

module.exports = router;