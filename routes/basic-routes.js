var express = require('express');
var router = express.Router();
const { use } = require('passport');
const { route } = require('./user-routes');
var auth = require('../config/auth');
var isUser = auth.isUser;
var isAdmin = auth.isAdmin;
var NotAdmin = auth.NotAdmin;
const User = require('../models/user-model');
var Job = require('../models/job-model');
const Blog = require('../models/blog-model');
const fetch = require('node-fetch');
const { model } = require('../models/blog-model');
const bcrypt = require('bcryptjs');

router.get('/',function(req,res){
    res.render('home',{title : 'Home'});
});


router.get('/contact',function(req,res){
    res.render('contact',{title : 'Contact Us'});
});

router.get('/tip',function(req,res){
  Blog.find(function(err, blogs){
    res.render('tips',
    {
        title : 'Tips and Tricks',
       blogs:blogs
    });
});

});


// my profile page
router.post('/edit1',isUser,NotAdmin, function (req, res) {
  
  const {name,contact,email,location, linkedin , github , experience , cgpa, bio ,year,backlogs} = req.body;
// console.log(linkedin);
    var user = req. user;
    user.linkedin = linkedin;
    user.github = github;
    user.experience = experience;
    user.backlogs = backlogs;
    user.cgpa = cgpa;
    user.bio = bio;
    user.year = year;
    user.name= name;
    user.contact = contact;
    user.email = email;
    user.location = location;
  req.user.save();
  req.flash('success','Successfully Updated!');
  res.redirect('/users/profile');
});


// change password
router.post('/changepswd',isUser,NotAdmin, function (req, res) {
  
  const {newpass, confirmpass} = req.body;
  // console.log(newpass);
    var user = req. user;
    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(newpass, salt, function (err, hash) {
          if (err)
              console.log(err);
          user.password = hash;
      });
  });
  req.user.save();
  req.flash('success','Successfully updated the password!');
  res.redirect('/users/profile');
});

//add new skill
router.post('/add_skill',isUser,NotAdmin, function (req, res) {
  
  const {  skill_name , level } = req.body;
  
    var user = req. user;
    var flag = 0;

    if(skill_name !== ""){
      for(var i=0;i<user.skills.length;i++){
        if(user.skills[i].name === skill_name){
            req.user.skills[i].level = level;
            flag = 1;
        }
        
      }

      if(flag === 0 ){
        req.user.skills.push({
          name : skill_name,
          level : level
        });
      }
      
  }
 
  req.user.save();
  req.flash('success','Successfully added new skill!');
  res.redirect('/users/profile');
});


//add work
router.post('/add_work',isUser,NotAdmin, function (req, res) {
  
 
  const{orgname,start_date, end_date , title , project_name ,description, contribution , comment} = req.body;
  
    var user = req. user;
  if(orgname !== ""){
    req.user.work.push({
      orgname,
      start_date,
       end_date ,
        
        title ,
         project_name, 
         description, 
         contribution , 
         comment
    })
  }
 
  req.user.save();
  req.flash('success','Successfully added new work experience!');
  res.redirect('/users/profile');
});

//add education
router.post('/add_education',isUser,NotAdmin, function (req, res) {
  
 
  const{title,from,to,university,result} = req.body;
  
    var user = req. user;
  if(title !== ""){
    req.user.education.push({
      title,
      from,
      to,
      university,
      result
    })
  }
 
  req.user.save();
  req.flash('success','Successfully added new qualification!');
  res.redirect('/users/profile  ');
});

// apply option
router.get('/apply/:id',isUser,NotAdmin,function(req,res){

      const jobid = req.params.id;
      const user = req.user;
      let existing;
      Job.findById(jobid, function (err, existing) {

              if(existing.open){
                    user.appliedjobs.push({
                          jobid,
                    });
                    existing.appliedusers.push({
                          name: user.name,
                          username : user.username,
                          public_profile : "http://localhost:5000/users/detail/" + user._id ,
                    });

                    try {
                        existing.save();
                    } catch (err) {
                      console.log(err);
                    }
                    req.flash('success','Successfully applied for the job');
                    res.redirect('/admin/list'); 
              }else{
                    req.flash('danger','Applications are closed now.');
                    res.redirect('/admin/list'); 
              }
              
      });  
      
      
});

// job details page 
router.get('/job/:id',isUser,function(req,res){
      const jobid = req.params.id;
      let existing;
      Job.findById(jobid,function(err,existing){
            res.render('job_details',{
                    job : existing,
            });
      })
});


// post blog model
router.post('/tip',function(req,res){
  const { by, title , topic , content } = req.body;
    var blog = new Blog({
      by,
      title,
      topic,
      content,
     
    });
    blog.save();
    req.flash('success','Tip posted successfully!');
    res.redirect('/');
});

// get all users
router.get('/allusers',function(req,res){
    User.find(function(err, users){
        res.render('allusers',
        {
            title : 'Find candidate',
            users : users
        });
    });
})

module.exports = router;


