var express = require('express');
var router = express.Router();
const questionControllers = require('../controllers/question-controller');
const Question = require('../models/question-model');
const { use } = require('passport');
const { route } = require('./user-routes');
var auth = require('../config/auth');
var isUser = auth.isUser;
var isAdmin = auth.isAdmin;
var NotAdmin = auth.NotAdmin;
const User = require('../models/user-model');
const Blog = require('../models/blog-model');
const fetch = require('node-fetch');
const { model } = require('../models/blog-model');

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


// get question
router.get('/question', function (req, res) {
  res.render('question', {
      title: 'Question',
  });
});


router.post('/question',
  questionControllers.create);

// get skill test page
router.post('/test', function (req, res) {

  Question.find(function (err, questions) {
    res.render('test', {
      title: 'Skill test',
       questions : questions,
       skill : req.body.skill,
    });
});
});

// my profile page
router.post('/edit1',isUser,NotAdmin, function (req, res) {
  
  const {name,contact,email,location, linkedin , github , experience , cgpa, bio } = req.body;
// console.log(linkedin);
    var user = req. user;
    user.linkedin = linkedin;
    user.github = github;
    user.experience = experience;
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


// get c++ test
// router.get('/c',isUser,NotAdmin,function(req,res){
//   if(typeof(req.user.score) !== "undefined"){
//     req.flash('danger', 'Already given the test!');
//     res.redirect('/users/profile');
//   }
//   res.render('quesc++');
// });

// // get python test
// router.get('/python',isUser,NotAdmin,function(req,res){
//   if(typeof(req.user.score) !== "undefined"){
//     req.flash('danger', 'Already given the test!');
//     res.redirect('/users/profile');
//   }
//   res.render('quespython');
// });

// // get web test 
// router.get('/web',isUser,NotAdmin,function(req,res){
//   if(typeof(req.user.score) !== "undefined"){
//     req.flash('danger', 'Already given the test!');
//     res.redirect('/users/profile');
//   }
//   res.render('quesweb');
// });


// // get c++ test result
// router.post('/result/c',isUser,NotAdmin,function(req,res){
//   const {check1 ,check2, check3, check4, check5 } = req.body;
 
//   var marks=0;
//   if(typeof(check1) !== "undefined" ){
//     if(check1 === "3")
//     marks += 5;
//     else{
//       marks = marks-1;
//     }
//   }
//   if(typeof(check2) !== "undefined" ){
//     if(check2 === "5"){
//       marks += 5;
//     }
//     else{
//       marks = marks-1;
//     }
//   }
//   if(typeof(check3) !== "undefined"){
//     if(check3 === "9"){
//       marks += 5;
//     }
//     else{
//       marks = marks-1;
//     }
//   }
//   if(typeof(check4) !== "undefined"){
//     if(check4 === "16"){
//       marks += 5;
//     }
//     else{
//       marks = marks-1;
//     }
//   }
//   if(typeof(check5) !== "undefined" ){
//     if(check5 === "17"){
//       marks += 5;
//     }
//     else{
//       marks = marks-1;
//     }
//   }
//   if(typeof(req.user.tot_score) === "undefined"){
//     req.user.tot_score = marks;
//   }else{
//     req.user.tot_score = marks + req.user.git_score;
//   }

//   req.user.tot_score += marks;
//   req.user.score = marks;
//   req.user.save();
//   req.flash('success', 'You scored ' + marks + ' marks.');
//     res.redirect('/');
// });

// // get python test result
// router.post('/result/python',isUser,NotAdmin,function(req,res){
//   const {check1 ,check2, check3, check4, check5 } = req.body;
 
//   var marks=0;
//   if(typeof(check1) !== "undefined" ){
//     if(check1 === "4")
//     marks += 5;
//     else{
//       marks = marks-1;
//     }
//   }
//   if(typeof(check2) !== "undefined" ){
//     if(check2 === "5"){
//       marks += 5;
//     }
//     else{
//       marks = marks-1;
//     }
//   }
//   if(typeof(check3) !== "undefined"){
//     if(check3 === "11"){
//       marks += 5;
//     }
//     else{
//       marks = marks-1;
//     }
//   }
//   if(typeof(check4) !== "undefined"){
//     if(check4 === "14"){
//       marks += 5;
//     }
//     else{
//       marks = marks-1;
//     }
//   }
//   if(typeof(check5) !== "undefined" ){
//     if(check5 === "19"){
//       marks += 5;
//     }
//     else{
//       marks = marks-1;
//     }
//   }
//   if(typeof(req.user.tot_score) === "undefined"){
//     req.user.tot_score = marks;
//   }else{
//     req.user.tot_score = marks + req.user.git_score;
//   }

//   req.user.score = marks;
//   req.user.save();
//   req.flash('success', 'You scored ' + marks + ' marks.');
//   res.redirect('/');
// });


// // get web test result
// router.post('/result/web',isUser,NotAdmin,function(req,res){
//   const {check1 ,check2, check3, check4, check5 } = req.body;
 
//   var marks=0;
//   if(typeof(check1) !== "undefined" ){
//     if(check1 === "2")
//     marks += 5;
//     else{
//       marks = marks-1;
//     }
//   }
//   if(typeof(check2) !== "undefined" ){
//     if(check2 === "8"){
//       marks += 5;
//     }
//     else{
//       marks = marks-1;
//     }
//   }
//   if(typeof(check3) !== "undefined"){
//     if(check3 === "11"){
//       marks += 5;
//     }
//     else{
//       marks = marks-1;
//     }
//   }
//   if(typeof(check4) !== "undefined"){
//     if(check4 === "15"){
//       marks += 5;
//     }
//     else{
//       marks = marks-1;
//     }
//   }
//   if(typeof(check5) !== "undefined" ){
//     if(check5 === "17"){
//       marks += 5;
//     }
//     else{
//       marks = marks-1;
//     }
//   }
//   if(typeof(req.user.tot_score) === "undefined"){
//     req.user.tot_score = marks;
//   }else{
//     req.user.tot_score = marks + req.user.git_score;
//   }

//   req.user.score = marks;
//   console.log(req.user.tot_score);
//   req.user.save();
//   req.flash('success', 'You scored ' + marks + ' marks.');
//   res.redirect('/');
  
// });


// router.get('/accept/:company',isUser,NotAdmin,function(req,res){
   
//     var company = req.params.company;
//     var name = req.params.name;
//   var k;
//     for(var i=0;i<req.user.messages.length; i++){
//       if( req.user.messages[i].company === company ){
//         k=i;
//       }
//     }
//     var name = req.user.messages[k].name;
//     var msg = req.user.messages[k].message;
//     var company = req.user.messages[k].company;
//     var from = req.user.messages[k].from;
//     req.user.messages.splice(k,1);
   
//     User.find({_id : from},function(err,user){
//         user[0].messages.push({
//           message : "A candidate accepted your offer!",
//           name : req.user.name,
//           id : req.user.id,
//         });
//         user[0].save();
        
//     });
//     req.user.messages.push({
//       name,
//       message : msg,
//       company,
//       status : "Accepted",
//       from 
//     });


//     req.user.save();
//     req.flash('success','Offer Accepted. Recruiter will soon connect with you :)');
//     res.redirect('/');

// });

// router.get('/github_score',isUser,NotAdmin,async function(req,res){
//   var git = req.user.github;
//   var link = 'http://api.github.com/users/' + git + '/repos';
//   var stars = 0;
//   var resp = await fetch(link,{
//     method : 'GET'
//   });
//   var response =await  resp.json();
  
//   for(var i=0;i<response.length;i++){
//       stars += response[i].stargazers_count;
//   }


//   if(typeof(req.user.tot_score) === "undefined"){
//     req.user.tot_score = stars;
//   }else{
//     req.user.tot_score = req.user.score + stars;
//   }

//   req.user.git_score = stars;
  
//   req.user.save();
  
//   req.flash('success','Successfully updated your Github score!');
//   res.redirect('/');
// });

// post blog model
router.post('/tip',function(req,res){
  const { by, title , topic , content } = req.body;
    var blog = new Blog({
      by,
      title,
      topic,
      content
    });
    blog.save();
    req.flash('success','Tip posted successfully!');
    res.redirect('/');
});


module.exports = router;


