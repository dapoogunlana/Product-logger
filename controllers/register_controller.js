const express = require('express');
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

// router.get('/', (req, res)=>{
//     if(req.cookies.token){
//         res.redirect('/properties')
//         return
//     }
//     console.log(dbInterface)
//     mongoClient.connect(mongoURL2,{ useUnifiedTopology: true }, (err, client)=>{
//         if(!err){
//             console.log('Db Connected');
//             const db = client.db('hostingdb');
//             const users = db.collection('users').find()
//             let newUsers = []
//             new Promise((resolve, reject)=>{
//                 resolve(
//                     users.forEach((user) =>{
//                         newUsers.push(user);
//                     })
//                 )
//             })
//             .then(()=>{
//                 console.log(newUsers)
//                 res.render('register.ejs',{
//                     activeList:dummyArray, 
//                     imUrl:imageUrls, 
//                     user:user, 
//                     employee:'',
//                     success:'',
//                     failure:''
//                 });
//             })
//         }else console.log('did not connect ' + err)
//     });

// });

//Remade..
router.get('/', (req, res)=>{
    if(req.cookies.token){
        res.redirect('/properties')
        return
    }
    res.render('register.ejs',{
        activeList:dummyArray, 
        imUrl:imageUrls, 
        user:user, 
        employee:'',
        success:'',
        failure:'',
        registered:false
    });
});

// //  Parram getter
// router.get('/:id', (req, res)=>{
//     if(req.cookies.token){
//         res.redirect('/properties')
//         return
//     }
//     mongoClient.connect(mongoURL2,{ useUnifiedTopology: true }, (err, client)=>{
//         if(!err){
//             console.log('Db Connected');
//             const db = client.db('hostingdb');
//             const users = db.collection('users').find({"email":req.params.id})
//             let newUsers = []
//             new Promise((resolve, reject)=>{
//                 resolve(
//                     users.forEach((user) =>{
//                         newUsers.push(user);
//                     })
//                 )
//             })
//             .then(()=>{
//                 const newUser = newUsers[0];
//                 console.log(newUser)
//                 res.render('register.ejs',{
//                     activeList:dummyArray, 
//                     imUrl:imageUrls, 
//                     user:user, 
//                     user:newUser,
//                     success:'',
//                     failure:''
//                 });
//             });
//         }else console.log('did not connect ' + err)
//     });

// });


// // Local Mongo client getter
// router.post('/', (req, res)=>{
//     if(req.cookies.token){
//         res.redirect('/properties')
//         return
//     }
//     const input = req.body;
//     console.log(input);
//     const User = new userModel();
//     userModel.find({"email":req.body.email}, (err, doc)=>{
//         if(!err){
//             if(doc.length == 0){                
//                 User.fullName = req.body.fullname;
//                 User.email = req.body.email;
//                 User.mobile = req.body.mobile;
//                 User.city = req.body.city;
//                 User.password = req.body.password;
//                 User.token = Math.round(Math.random() * 100000000000000000000) + new Date().getTime().toString();
//                 console.log(User.token);
//                 User.save((err, data)=>{
//                     if(!err){
//                         console.log('saved successfully');
//                         res.render('register.ejs',{
//                             activeList:dummyArray, 
//                             imUrl:imageUrls, 
//                             user:user, 
//                             employee:'',
//                             success:'Saved Successfully',
//                             failure:''
//                         });
//                     }else{
//                         console.log(err);
//                         res.render('register.ejs',{
//                             activeList:dummyArray, 
//                             imUrl:imageUrls, 
//                             user:user, 
//                             employee:'',
//                             success:'',
//                             failure:'Error while saving'
//                         });
//                     }
//                 })
//             }else{
//                 console.log('Email already Exists');
//                 res.render('register.ejs',{
//                     activeList:dummyArray, 
//                     imUrl:imageUrls, 
//                     user:user, 
//                     employee:'',
//                     success:'',
//                     failure:'Email already Exists'
//                 })
//             }
//         }else{
//             console.log(err)
//             res.render('register.ejs',{
//                 activeList:dummyArray, 
//                 imUrl:imageUrls, 
//                 user:user, 
//                 employee:'',
//                 success:'',
//                 failure:'Unable to save'
//             })
//         }
//     })
// });


router.post('/', (req, res)=>{
    if(req.cookies.token){
        res.redirect('/properties')
        return
    }
    userModel.find({"email":req.body.email}, (err, info)=>{
        if(!err){
            if(info.length > 0){
                console.log('Email already Exists');
                res.render('register.ejs',{
                    activeList:dummyArray, 
                    imUrl:imageUrls, 
                    user:user, 
                    employee:'',
                    success:'',
                    failure:'Email already Exists',
                    registered:false
                })
            }else{
                const User = new userModel()
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
                            failure:'',
                            registered:true
                        });
                    }else{
                        console.log(err);
                        res.render('register.ejs',{
                            activeList:dummyArray, 
                            imUrl:imageUrls, 
                            user:user, 
                            employee:'',
                            success:'',
                            failure:'Error while saving',
                            registered:false
                        });
                    }
                })
            }
        }
    })
});

module.exports = router;