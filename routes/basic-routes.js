var express = require('express');
// const Product = require('../models/product-model');
var router = express.Router();


router.get('/',function(req,res){
  res.render('home',{title : 'Home'});
});


router.get('/about',function(req,res){
    res.render('about',{title : 'Home'});
  });

// router.get('/contact',function(req,res){
//     res.render('contactus',{title : 'Contact Us'});
// });

// router.get('/saladbox',function(req,res){
//   res.render('saladbox',{title : 'Subscribe'});
// });

// router.get('/partners',function(req,res){
//   res.render('partners',{title : 'Business Partners'});
// });

// router.get('/testimonials',function(req,res){
//   res.render('testimonials',{title : 'Testimonials'});
// });

module.exports = router;


