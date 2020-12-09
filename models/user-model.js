const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

const userSchema = new Schema({
	name: {type: String, required :true},
	email : { type : String, required : true, unique: true},
	password : { type : String, required: true , minlength: 6},
  username : {  type : String, required : true },
  contact : {type : Number},
  gender : {type : String , required : true},
  bio : {type: String},
  admin : { type : Number},
  location : {type: String },
  linkedin : {type: String},
  github : {type : String},
  experience : {type: Number},
  skills : [],
  education : [],
  work : [],
  job_type : {type: String},
  job_category : {type: String },
  cgpa : {type : Number},
  year : {type: Number},
  backlogs : {type : String},
  appliedjobs : [],
  resetToken : {type: String},
  expireToken : {type:Date},
});

userSchema.plugin(uniqueValidator);
module.exports = mongoose.model('User',userSchema);