var express = require('express');
var router = express.Router();
var User = require('../models/user-model');
var auth = require('../config/auth');
var isAdmin = auth.isAdmin;

router.get('/all/users',isAdmin,function(req,res){
    User.find(function(err, users){
        res.render('admin/candidate-admin',
        {
            title : 'Find candidate',
            users : users
        });
    });
});

router.post('/filter',isAdmin,function(req,res){
    const{ exp , sal , job_type, job_category, skills, location } = req.body;
    
    User.find(function(err, users){
        res.render('admin/filter',{
            title: "Filtered users",
            exp : exp,
            sal : sal,
            job_type : job_type,
            job_category,
            users : users,
            skills : skills,
            location : location
        });
    });
});

router.get('/sort/salary',isAdmin,function(req,res){
    var mysort = {min_salary : 1};
    User.find(function(err, users){
        res.render('admin/candidate-admin',
        {
            title : 'Find candidate',
            users : users
        });
    }).sort(mysort);
});

router.get('/sort/experience',isAdmin,function(req,res){
    var mysort = { experience : 1};
    User.find(function(err, users){
        res.render('admin/candidate-admin',
        {
            title : 'Find candidate',
            users : users
        });
    }).sort(mysort);
});

router.get('/sort/score',isAdmin,function(req,res){
    var mysort = { tot_score  : 1};
    User.find(function(err, users){
        res.render('admin/candidate-admin',
        {
            title : 'Find candidate',
            users : users
        });
    }).sort(mysort);
});


router.get('/shortlist/:id',isAdmin,function(req,res){
    const id = req.params.id;

    User.find({_id : id}, function(err,user){
        
        res.render('admin/shortlist_form',{
            title : "Shortlist",
            user : user,
            id: id
        })
    });
    
});

router.get('/messages',isAdmin,function(req,res){
    res.render('admin/messages',{
        user : req.user
    });
});


router.post('/msg/:id',isAdmin,function(req,res){
    const id = req.params.id;
    const { message, company } = req.body;
    
    User.find({ _id : id}, function(err,user){
        user[0].messages.push({
            name : req.user.name,
            message : message,
            company : company,
            status : "pending",
            from :req.user._id, 
        });
        user[0].save();
    });
    req.flash('success', 'Message sent!');
    res.redirect('/admin/all/users');
});




module.exports = router;