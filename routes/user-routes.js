const express = require('express');
const router = express.Router();
const userControllers = require('../controllers/users-controllers');
const passport = require('passport');
var bcrypt = require('bcryptjs');
var auth = require('../config/auth');
var isUser = auth.isUser;

// Get Users model
var User = require('../models/user-model');

// get register
router.get('/register', function (req, res) {
    res.render('register', {
        title: 'Register',
    });

});


// route to signup
router.post('/register',
  userControllers.signup);

// get route for login 
router.get('/login', function (req, res) {

    if (res.locals.user) res.redirect('/');
    
    res.render('login', {
        title: 'Log in'
    });

});

// route to login
router.post('/login',userControllers.login);

// route to logout
router.get('/logout',isUser, userControllers.logout);

// profile page
router.get('/profile',isUser,auth.NotAdmin,userControllers.profile);

router.get('/detail/:id',isUser,userControllers.details);

module.exports = router;

