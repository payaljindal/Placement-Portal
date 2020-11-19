const express = require('express');
const mongoose = require('mongoose');
const User = require('../models/user-model');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const { checkBody } = require('express-validator');


const signup = async (req,res,next) => {

  var name = req.body.name;
  var email = req.body.email;
  var username = req.body.username;
  var password = req.body.password;

  const {marital, gender, contact , languages, location } = req.body;
  
  if (name=="" || email=="" || username=="" || password =="") {

    req.flash('danger', 'All the fields are required');
      res.redirect('/');
  }
   else {
      User.findOne({username: username}, function (err, user) {
          if (err)
              console.log(err);

          if (user) {
              req.flash('danger', 'Username exists, choose another!');
              res.redirect('/');
          } else {
              var user = new User({
                  name: name,
                  email: email,
                  username: username,
                  password: password,
                  admin: 0,
                  gender,
                  marital,
                  contact,
                  languages,
                  location
              });

              bcrypt.genSalt(10, function (err, salt) {
                  bcrypt.hash(user.password, salt, function (err, hash) {
                      if (err)
                          console.log(err);

                      user.password = hash;

                      user.save(function (err) {
                          if (err) {
                              console.log(err);
                          } else {
                              req.flash('success', 'You are now registered!');
                              res.redirect('/');
                          }
                      });
                  });
              });
          }
      });
  }
};

const login = async (req,res,next) => {

  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login',
    failureFlash: true,
    user : req.user 
  })(req, res, next);
}


const logout = (req,res,next) => {
  req.logout();
  req.flash('success','Logged out!');
  res.redirect('/users/login');

}   

//user profile
const profile = (req,res,next) => {
    res.render('profile', {
        title: 'Profile',
        user : req.user,
    });
}

const details = (req,res,next) => {
    const id = req.params.id;
    User.find({_id : id},function(err,user){
        res.render('details',{
            title : 'Details',
            user : user,
            admin : req.user.admin,
        })
    })
    // res.redirect('/');
}

exports.details = details;
exports.signup = signup;
exports.login = login;
exports.logout = logout;
exports.profile = profile;

