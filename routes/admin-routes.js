var express = require('express');
var router = express.Router();
var User = require('../models/user-model');
var Job = require('../models/job-model');
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

router.get('/addnew',isAdmin,function(req,res){
    res.render('admin/addnew',{
        title: 'New company'
    })
});

// get list page 
router.get('/list',isAdmin,function(req,res){
    Job.find(function(err, jobs){
        res.render('admin/alljobs',
        {
            title : 'All companies',
            jobs : jobs
        });
    });
});


// Add new job 
router.post('/add',isAdmin,function(req,res){
        const{name,stipend,purpose,time_period,year,location,branch} = req.body;

        var job = new Job({
            name: name,
            stipend:stipend,
            purpose: purpose,
            time_period:time_period,
            year:year,
            location:location,
            branch : branch
        });

        job.save();
        req.flash('success', 'Successfully posted about new company!');
        res.redirect('/');

});

// get edit job page 
router.get('/edit-info/:id',isAdmin, function (req, res) {
        Job.findById(req.params.id, function (err, p) {
            if (err) {
                console.log(err);
                res.redirect('/admin/list');
            } else {
                        
                        res.render('admin/edit-job', {
                            name : p.name,
                            stipend : p.stipend,
                            location : p.location,
                            time_period : p.time_period,
                            purpose : p.purpose,
                            year : p.year,
                            location : p.location,
                            branch : p.branch,
                            id : p._id
                        });
                    }    
            
        });
});

// post update info 
router.post('/edit-info/:id',isAdmin,async function(req,res){
    const{name,stipend,purpose,time_period,year,location,branch} = req.body;
    let existing;
    const id = req.params.id;

    await Job.findById(id, function (err, existing) {
        if (err)
            console.log(err);
                        
        if (existing) {
            existing.name = name;
            existing.stipend = stipend;
            
            existing.time_period =time_period;
            existing.location = location;
            existing.branch = branch;
            if(typeof(year) != "undefined"){
                existing.year = year;
                console.log(existing.year);
            }
            if(typeof(purpose) != "undefined"){
                existing.purpose = purpose;
            }
                
        }
    try {
       existing.save();
    } catch (err) {
      console.log(err);
    }
    });
    req.flash('success', 'Successfully updated info!');
    res.redirect('/admin/list');
});

// delete job 
router.get('/delete/:id',isAdmin, async function (req, res) {
    var id = req.params.id;
    await Job.findById(id,   function (err, existing){
        existing.remove();
    });
    req.flash('success', 'Successfully deleted!');
    res.redirect('/admin/list');      
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