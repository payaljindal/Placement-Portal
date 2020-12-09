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
const crypto = require('crypto');
var nodemailer = require('nodemailer');
const { model } = require('../models/blog-model');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
dotenv.config();
let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'payaljindal05052001@gmail.com',
    pass: process.env.PASSWORD,
  }
});


router.get('/',function(req,res){
    res.render('home',{title : 'Home'});
});

router.get('/reset/:token',function(req,res){
  // console.log(req.params.token);
  res.render('newpass',{title : 'Home',
  token : req.params.token,
  });
});

router.get('/resetpassword',function(req,res){
  res.render('resetpassword.ejs');
})

router.post('/newpassword',function(req,res){
      const newpass = req.body.password;
      const senttoken = req.body.token;
      //console.log(newpass);
      // console.log(senttoken);

      User.findOne({resetToken : senttoken,expireToken:{$gt:Date.now()}},function(err,user){
          if(!user){
                req.flash("Token expired!");
                res.redirect('/users/login');
          }
          else{
            bcrypt.genSalt(10, function (err, salt){
              bcrypt.hash(newpass, salt, function (err, hash) {
                  if (err)
                      console.log(err);

                  user.password = hash;
                  user.resetToken=undefined;
                  user.expireToken = undefined;

                  user.save(function (err) {
                      if (err) {
                          console.log(err);
                      } else {
                          req.flash('success', 'Password changed successfully!');
                          res.redirect('/users/login');
                      }
                  });
              });
            });
          }
      });
});

router.post('/resetpassword',function(req,res){
  crypto.randomBytes(32,(err,buffer)=>{
    if(err){
      console.log(err);
    }
    const token = buffer.toString("hex");
    // console.log(req.body.email);
    User.findOne({email:req.body.email},function(err,user){
        if(!user){
          // console.log("iff");
          req.flash("danger","No such user exists. Try again");
          res.redirect('/resetpassword');
        }
        else{
          // console.log("else");
          user.resetToken = token;
          user.expireToken = Date.now() + 3600000;
          let link = process.env.LINK + token;
          // console.log(link);
          user.save().then((result)=>{
            transporter.sendMail({
              to : user.email,
              from : "no-reply@placement--portal.com",
              subject : "Password reset",
              html :`
              <p>You requested for password reset</p>
              <h5> Click on this <a href="${link}">link</a> to reset password </h5>
              `
            },function(err){
              console.log(err);
            });
            req.flash("success","Email sent successfully..check your mail");
            res.redirect('/users/login');
          });
        }
    });
  });

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
  
  const {name,contact,email,location, linkedin , github , experience , cgpa, bio ,backlogs} = req.body;
// console.log(linkedin);
    var user = req. user;
    user.linkedin = linkedin;
    user.github = github;
    user.experience = experience;
    user.backlogs = backlogs;
    user.cgpa = cgpa;
    user.bio = bio;
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
                    // already applied 
                    let flag = 0;
                    user.appliedjobs.forEach(function(job){
                        if(job.jobid == jobid){
                          flag = 1;
                        }
                    });
                    if(flag){
                      req.flash('danger','Already applied!');
                      res.redirect('/admin/list'); 
                    }else{

                      // apply 
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
                        user.save();
                    } catch (err) {
                      console.log(err);
                    }
                    req.flash('success','Successfully applied for the job');
                    res.redirect('/admin/list'); 
                    }
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
  try{
    var blog = new Blog({
      by,
      title,
      topic,
      content,
     
    });
    blog.save();
    req.flash('success','Tip posted successfully!');
    res.redirect('/');
  } catch(err){
    req.flash('danger','err');
    res.redirect('/tip');
  }

    
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


